<template>
  <div class="facetList">
        <div  v-for="facets in facetList.facets" :key="facets.facetName" v-show="facets.showInList">
            <h5 class="facetItem">{{facets.facetName}}</h5>
              <ul class="list-group" v-for="facet in facets.values" :key="facet.name">
                    <li class="list-group-item d-flex justify-content-between align-items-center" :active="facet.selected" :id="facets.facetName + facet.name" v-on:click="handleSelect(facets.fieldName,facet,$event)" >
                      {{facet.name}} <span class="badge badge-primary badge-pill">{{facet.count}}</span>
                  </li>
              </ul>
        </div>

        <!--
          <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Cras justo odio
            <span class="badge badge-primary badge-pill">14</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Dapibus ac facilisis in
            <span class="badge badge-primary badge-pill">2</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Morbi leo risus
            <span class="badge badge-primary badge-pill">1</span>
          </li>
        </ul>
          -->
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import Vuetable from 'vuetable-2/src/components/Vuetable'

export default {
  name: 'FacetList',
  mounted: function(){
    console.log('mounted')
    this.$store.dispatch('refreshFacets')
  },
  components: {
    Vuetable
  },
  computed: {...mapState([
      'facetList'
    ])
  },
  methods:{
    ...mapActions(['refreshFacets','toggleFacet']),
    handleSelect: function(fieldName,facet,e){
      console.log(fieldName,facet,e)
      this.toggleFacet({fieldName:fieldName,facet:facet})
      this.$nextTick(this.refreshFacets);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item {
  padding-left:10px;
  padding-right:10px;
  padding-top:5px;
  padding-bottom:5px;
}
</style>
