<template>
  <div>
        <div v-for="facets in facetList" :key="facets.facetName">
            <div>{{facets.facetName}}</div>
            <div v-for="facet in facets.facets" :key="facet.name">
                <div>{{facet.count}} - {{facet.name}} </div>
            </div>
        </div>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'FacetList',
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
</style>
