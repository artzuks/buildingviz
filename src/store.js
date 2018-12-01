import Vue from 'vue'
import Vuex from 'vuex'

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
    'markers':[]
  },
  mutations: {

  },
  actions: {

  }
})
