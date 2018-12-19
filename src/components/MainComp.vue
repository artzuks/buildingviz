<template>
  <div>
    <GmapMap
      :center="mapCenter"
      :zoom="15"
      map-type-id="terrain"
      style="width: auto; height: 700px"
      ref="mapRef"
      @bounds_changed="boundsChanged('bounds', $event)"
    >
      <GmapInfoWindow :options="infoOptions" :position="mapCenter" :opened="mapInfoOpen" @closeclick="closeMapInfo">
        <div v-html="mapInfoText"></div>
      </GmapInfoWindow>

      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="clickEvent(m)"
      />
    </GmapMap>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import SearchBox from '@/components/SearchBox.vue'
import { gmapApi } from 'vue2-google-maps'
var _ = require('lodash');

export default {
  name: 'MainComp',
  data: function(){
    return {
      map:"",
      infoWinOpen:true,
      infoContent:'poop lol',
      infoOptions: {
            pixelOffset: {
              width: 0,
              height: -35
            }
          },
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
      'markers',
      'mapCenter',
      'mapInfoOpen',
      'mapInfoText'
    ]),
    google:gmapApi
  },
  methods:{
    ...mapActions(['setBounds','refreshFacets','closeMapInfo','setMapInfoWindow']),
    'boundsChanged':_.debounce(function(b,e){
      if (e){
        let bounds = {ne:e.getNorthEast(),sw:e.getSouthWest()};
        this.setBounds(bounds)
        this.refreshFacets();
      }
    },100),
    clickEvent:function(ev){
      console.log(ev);
      this.setMapInfoWindow(ev)
    }
  },
  components: {
    SearchBox
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
