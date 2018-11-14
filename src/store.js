import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    'facetList': [
      {
        'facetName':"Construction Companies",
        'facets':[
          {name:"Sri",count:4,value:"JMR"},
          {name:"Big Booom", count:12,value:"BB"}
      ]},
      {
        "facetName" : "Landmark",
        'facets': [
          {name:"Yes",count:30,value:"YES"},
          {name:"No",count:150,value:"N)"},
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
