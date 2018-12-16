<template>
  <div class="facetList">
        <div  v-for="facets in facetList.facets" :key="facets.facetName">
            <h5 class="facetItem">{{facets.facetName}}</h5>
            <div class="form-check ">
              <div v-for="facet in facets.values" :key="facet.name">
                  <div class="facetItem form-check">
                    <input class="form-check-input form-check-input-sm" type="checkbox" :id="facets.facetName + facet.name" v-model="facet.selected" @input=handleSelect(facets.facetName,facet,$event) />
                    <label class="form-check-label form-check-lavel-sm" :for="facets.facetName + facet.name">
                      {{facet.name}} ({{facet.count}})
                    </label>
                  </div>
              </div>
            </div>
        </div>
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
  computed: mapState([
    // map this.count to store.state.count
    'facetList'
  ]),
  methods:{
    ...mapActions(['refreshFacets']),
    handleSelect: function(fieldName,facet,e){
      console.log(fieldName,facet,e)
      this.$nextTick(this.refreshFacets);
    }
  }
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
