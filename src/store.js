import Vue from 'vue'
import Vuex from 'vuex'
import { API } from 'aws-amplify'

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
    'queryText':"",
    "queryFilters":""
  },
  mutations: {

  },
  actions: {
    refreshFacets:({state})=>{
      let apiName = 'search';
      let path = '/search'; 
      let params = { // OPTIONAL
          headers: {},
          response: true,
          queryStringParameters: {  // OPTIONAL
              q: state.queryText,
              "q.parser": "lucene",
              "q.options": {fields:['borough_lit']},
              "facet.borough_lit":{}
          }
      }
      API.get(apiName, path, params).then(response => {
          //console.log(response);
      }).catch(error => {
          //console.log(error.response)
      });
    }
  }
})
