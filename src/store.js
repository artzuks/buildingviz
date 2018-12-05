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

export default new Vuex.Store({
  state: {
    'facetList': [
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
    ],
    'markers':[],
    'queryText':"*",
    "queryFilters":""
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
    }
      
  },
  actions: {
    refreshFacets:({state,commit})=>{
      let apiName = 'search';
      let path = '/search'; 
      let params = { // OPTIONAL
          headers: {},
          response: true,
          queryStringParameters: {  // OPTIONAL
              q: state.queryText,
              "q.parser": "lucene",
              "q.options": JSON.stringify({fields:['_id']}),
              "facet.borough_lit":"{}",
              "facet.filing_status_lit":"{}",
              "facet.permit_status_lit":"{}",
              "facet.city_lit":"{}",
              "facet.gis_nta_name_lit":"{}",
              "facet.permittee_s_business_name_lit":"{}"
          }
      }
      API.get(apiName, path, params).then(response => {
          console.log(response);
          commit('mapFacetsToState',response.data.facets);
      }).catch(error => {
          //console.log(error.response)
      });
    }
  }
})
