import Vue from 'vue'
import Vuex from 'vuex'
import Amplify, { API } from 'aws-amplify'

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
  constructor(fieldName,displayName){
    this.fieldName = fieldName;
    this.displayName = displayName;
    this.values = [];
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
    this.facets = {
      'borough_lit' : new Facet('borough_lit',"Borough"),
      'filing_status_lit' : new Facet('filing_status_lit', 'Filing Status'),
      'permit_status_lit' : new Facet('permit_status_lit', 'Permit Status'),
      'city_lit' : new Facet('city_lit','City'),
      'gis_nta_name_lit' : new Facet('gis_nta_name_lit', 'Area'),
      'permittee_s_business_name_lit' : new Facet('permittee_s_business_name_lit','Business')
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

  getActiveFacets(){
    let active = [];
    for (let f in this.facets){
      let fac = this.facets[f];
      active.push({name:fac.fieldName,values:fac.getActiveFacets()})
    }
    return active;
  }
}

function generateQuery(state){
  state.facetLists
}

export default new Vuex.Store({
  state: {
    /*'facetList': [
      {
        'facetName':"Construction Companies",
        'facets':[
          {name:"Sri",count:4,value:"JMR",selected:false},
          {name:"Big Booom", count:12,value:"BB",selected:false}
      ]},
      {
        "facetName" : "Landmark",
        'facets': [
          {name:"Yes",count:30,value:"YES",selected:false},
          {name:"No",count:150,value:"NO",selected:false},
        ]
      }
    ],*/
    'markers':[],
    'queryText':"*",
    "queryFilters":"",
    'facetList': new Facets()
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
              "q.options": JSON.stringify({fields:['_id']})
          }
      }
      let facets = state.facetList.facetNames.map((f)=>"facet."+f);
      facets.forEach((f)=>params.queryStringParameters[f]="{}")

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

      API.get(apiName, path, params).then(response => {
          console.log(response);
          //commit('mapFacetsToState',response.data.facets);
          commit('updateFacets',response.data.facets);
      }).catch(error => {
          //console.log(error.response)
      });
    }
  }
})
