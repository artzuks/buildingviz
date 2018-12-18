<template>
  <div class="forecast">
    <b-container fluid>
      <b-row>
        <b-col md="3" class="py-3"></b-col>
        <b-col md="6" class="py-6">
          <AutoComp/>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="5" class="py-5"><LineChartz prepath="rent" :areaName="getArea.areaName"/></b-col>
        <b-col md="5" class="py-5"><LineChartz prepath="sale" :areaName="getArea.areaName"/></b-col>
        <b-col md="2" class="py-2"></b-col>
      </b-row>
      <b-row v-show="getArea.areaType !== 'borough'">
        <b-col md="5" class="py-5"><LineChartz prepath="rent" :areaName="getArea.Borough"/></b-col>
        <b-col md="5" class="py-5"><LineChartz prepath="sale" :areaName="getArea.Borough"/></b-col>
        <b-col md="2" class="py-2"></b-col>
      </b-row>
    
    </b-container>
  </div>
</template>

<script>
import Slider from '@/components/Slider.vue'
import LineChartz from '@/components/LineChart.vue'
import AutoComp from '@/components/AutoComp.vue'

import {mapState} from 'vuex'

export default {
  name: 'Forecast',
  components: {
    Slider,
    LineChartz,
    AutoComp
  },
    computed:{
    ...mapState(['selectedArea','hoods']),
    getArea:function(){
      return this.hoods.find((e)=>e.areaName===this.selectedArea);
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
</style>
