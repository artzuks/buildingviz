<template>
  <div>
    <GmapMap
      :center="{lat:40.785091, lng:-73.968285}"
      :zoom="15"
      map-type-id="terrain"
      style="width: auto; height: 600px"
      ref="mapRef"
      @bounds_changed="boundsChanged('bounds', $event)"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import { gmapApi } from 'vue2-google-maps'
var _ = require('lodash');

export default {
  name: 'MainComp',
  data: function(){
    return {
      map:""
    }
  },
  mounted (){
    var that = this;
    this.$refs.mapRef.$mapPromise.then((map) => {
      that.map = map
    })
  },
  computed: {
    ...mapState([
      // map this.count to store.state.count
      'markers'
    ]),
    google:gmapApi
  },
  methods:{
    ...mapActions(['setBounds','refreshFacets']),
    'boundsChanged':_.debounce(function(b,e){
      if (e){
        let bounds = {ne:e.getNorthEast(),sw:e.getSouthWest()};
        this.setBounds(bounds)
        this.refreshFacets();
      }
    },100)
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
</style>
