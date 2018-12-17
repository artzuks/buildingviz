import Vue from 'vue'
import Vuex from 'vuex'
import Amplify, { API } from 'aws-amplify'
import markets from './assets/hoods.json'

Amplify.configure({
  API: {
    endpoints: [
        {
            name: "search",
            endpoint: "https://sgjubhupaf.execute-api.us-east-1.amazonaws.com/PROD"
        },
    ]
  }
})

Vue.use(Vuex)

class Facet{
  constructor(fieldName,displayName,buckets){
    this.fieldName = fieldName;
    this.displayName = displayName;
    this.values = [];
    this.buckets = buckets;
  }
  get facetName(){
    return this.displayName
  }

  get facets(){
    return this.values
  }

  set facets(facs){
    let sel = this.getActiveFacets()
    this.values = facs.map((f)=>{
      return {
        name : f.value,
        value: f.value,
        count : f.count,
        selected : sel.find((s)=>s===f.value)?true:false
      }
    });
  }

  getActiveFacets(){
    return this.values
    .filter((fac)=>{
      return fac.selected; })
    .map((fac)=>{
      return fac.value; })
  }
}

class Facets{
  constructor(){
    let buckets = [];
    let begin = 2010
    for (;begin<2019;++begin){
      let start = new Date(begin,0);
      let end = new Date(begin,11,31,23,59,59);
      buckets.push("['" + start.toISOString() + "','" + end.toISOString() + "']");
    }
    

    this.facets = {
      'borough_lit' : new Facet('borough_lit',"Borough"),
      'filing_status_lit' : new Facet('filing_status_lit', 'Filing Status'),
      'permit_status_lit' : new Facet('permit_status_lit', 'Permit Status'),
      //'city_lit' : new Facet('city_lit','City'),
      'gis_nta_name_lit' : new Facet('gis_nta_name_lit', 'Area'),
      'permittee_s_business_name_lit' : new Facet('permittee_s_business_name_lit','Business'),
      'filing_date_d': new Facet('filing_date_d','Year',buckets)
    } 
  }

  updateFacet({facetName,newValues}){
    let fac = this.facets[facetName]
    if (!fac){
      console.error('unknown facet ', facetName);
      return;
    }
    fac.facets = newValues;
  }
  
  get facetNames(){
    return Object.keys(this.facets);
  }

  get facetList(){
    return Object.values(this.facets);
  }

  getActiveFacets(){
    let active = [];
    for (let f in this.facets){
      let fac = this.facets[f];
      active.push({name:fac.fieldName,values:fac.getActiveFacets()})
    }
    return active;
  }
}

function mapChartResponse(resp,keyName){
  var start = new Date(resp.start);
  var ret = [];
  for (let i = 0; i< resp.target.length;++i){
    let pushee = {
      date: start.toISOString().substr(0,7),
      dateObj: new Date(start)
    }
    pushee[keyName] = resp.target[i]
    ret.push(pushee)
    start.setMonth(start.getMonth()+1)
  }
  return ret
}

export default new Vuex.Store({
  state: {
    'markers':[],
    'queryText':"*",
    "queryFilters":"",
    'facetList': new Facets(),
    'chartDataCache': {
      'rentactual':{},
      'salesactual':{}
    },
    hoods: markets,
    'selectedArea':"Manhattan",
    bounds:{},
    sliders:{rent:[2015,2020],sale:[2015,2020]}
  },
  mutations: {
    mapFacetsToState(state,facets){
      if (!facets){
        return;
      }
      let newList = [];
      for (let f in facets){
        let newFacet = {
          facetName: f,
          facets:facets[f].buckets.map((fac)=>{
            fac.selected = false;
            fac.name = fac.value;
            return fac;
          })
        }
        newList.push(newFacet);
      }
      state.facetList = newList;
    },
    updateFacets(state,facetResponse){
      for (let f in facetResponse){
        state.facetList.updateFacet({facetName:f,newValues:facetResponse[f].buckets})       
      }
    },
    updateChartDataCache(state,{path,name,values}) {
      let hoods = state.hoods;
      for (let i = 0;i<hoods.length;++i){
        if (hoods[i].areaName === name){
          hoods[i][path] = values;
        }
      }
    },
    updateArea(state,area){
      state.selectedArea = area;
    },
    setBounds(state,bounds){
      state.bounds = bounds
    },
    updateSlider(state,val){
      state.sliders[val.name] = val.val;
    },
    updateMarkers(state,markers){
      let tmk = markers.map((el)=>{
        el.position = {
          lng : parseFloat(el.fields.gis_longitude_t),
          lat : parseFloat(el.fields.gis_latitude_t)
        }
        return el;
      })
      state.markers = tmk;
    }
  },
  actions: {
    updateFilters:({state,commit},facet)=>{
      //commit('updateFacets',facet);
    },
    updateQuery:({state,commit})=>{
      console.log('merp');
    },
    refreshFacets:({state,commit})=>{
      let apiName = 'search';
      let path = '/search'; 
      let params = { // OPTIONAL
          headers: {},
          response: true,
          queryStringParameters: {  // OPTIONAL
              "q.parser": "lucene",
              "q.options": JSON.stringify({fields:['_id']}),
              "size":150
          }
      }

      let facets = state.facetList.facetList.map((f)=>{
        let q = {};
        if (f.buckets){
          q['buckets'] = f.buckets;
        }
        return {
          name:"facet."+f.fieldName,
          q:JSON.stringify(q)
        }
        
      });
      facets.forEach((f)=>{
        params.queryStringParameters[f.name]=f.q
      })

      let activeFacets = state.facetList.getActiveFacets();
      let queries = [];
      for (let i = 0; i<activeFacets.length;++i){
        let af = activeFacets[i]
        let qs = af.values.map((f)=>af.name + ":\"" + f + "\"").join(' OR ');
        if (qs){
          queries.push(qs);
        }
        
      }
      let query = queries.join(' AND ');
      if (!query){
        query = "*"
      }
      params.queryStringParameters.q = query;
      if (state.bounds.ne && state.bounds.sw){
        let fq = "gis_location_latlon:['" 
              +  state.bounds.ne.lat() + "," + state.bounds.sw.lng() + "','"
              +  state.bounds.sw.lat() + "," + state.bounds.ne.lng() + "']"
        params.queryStringParameters.fq = fq
      }
      API.get(apiName, path, params).then(response => {
          console.log(response);
          //commit('mapFacetsToState',response.data.facets);
          commit('updateFacets',response.data.facets);
          commit('updateMarkers',response.data.hits.hit)
      }).catch(error => {
          //console.log(error.response)
      });
    },
    rentData:({state,commit},hood) =>{
      let area = state.hoods.find((h)=>h.areaName===hood);
      if (area.rentactual.length > 0 && area.rentprediction.length > 0){
        return;
      }
      let apiName = 'search';
      let obj = 'forecastout/rent/actual/' + hood + '.json';
      let path = '/buildingviz-data/' + encodeURIComponent(obj);
      API.get(apiName, path).then(response => {
          console.log(response);
          commit('updateChartDataCache',{ 
                                          path:"rentactual",
                                          name:hood,
                                          values: mapChartResponse(response,'actual')

                                    })
      }).catch(error => {
          console.log(error.response)
      });
      obj = 'forecastout/rent/prediction/' + hood + '.0.5.json';
      path = '/buildingviz-data/' + encodeURIComponent(obj);
      API.get(apiName, path).then(response => {
        console.log(response);
        commit('updateChartDataCache',{ 
                                        path:"rentprediction",
                                        name:hood,
                                        values: mapChartResponse(response,'prediction')

                                  })
        }).catch(error => {
            console.log(error.response)
      });
    },
    salesData:({state,commit},hood) =>{
      let area = state.hoods.find((h)=>h.areaName===hood);
      if (area.saleactual.length > 0 && area.saleprediction.length > 0){
        return;
      }
      let apiName = 'search';
      let obj = 'forecastout/sales/actual/' + hood + '.json';
      let path = '/buildingviz-data/' + encodeURIComponent(obj);
      API.get(apiName, path).then(response => {
          console.log(response);
          commit('updateChartDataCache',{ 
                                          path:"saleactual",
                                          name:hood,
                                          values: mapChartResponse(response,'actual')

                                    })
      }).catch(error => {
          console.log(error.response)
      });
      obj = 'forecastout/sales/prediction/' + hood + '.0.5.json';
      path = '/buildingviz-data/' + encodeURIComponent(obj);
      API.get(apiName, path).then(response => {
        console.log(response);
        commit('updateChartDataCache',{ 
                                        path:"saleprediction",
                                        name:hood,
                                        values: mapChartResponse(response,'prediction')

                                  })

        }).catch(error => {
            console.log(error.response)
      });
    },
    updateArea:({commit},hood)=>{
      commit('updateArea',hood)
    },
    setBounds:({commit},bounds)=>{
      commit('setBounds',bounds)
    },
    updateSlider:({commit},val)=>{
      commit('updateSlider',val)
    }
  },
  getters : {
    getChartData: (state,getters) => (hood) => {
      
    }
  }
})
