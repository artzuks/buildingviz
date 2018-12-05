<template>
  <div class="facetList">
        <div  v-for="facets in facetList" :key="facets.facetName">
            <h5 class="facetItem">{{facets.facetName}}</h5>
            <div v-for="facet in facets.facets" :key="facet.name">
                <div class="facetItem"><input type="checkbox" id="checkbox" v-model="facet.selected"> {{facet.name}} ({{facet.count}})</div>
            </div>
        </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'
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
  computed: mapState([
    // map this.count to store.state.count
    'facetList'
  ])
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.facetItem {
  text-align:start;
}

.facetList {
  align-content: center;
  text-align: center;
}
</style>
