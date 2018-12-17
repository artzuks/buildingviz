<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col md="3" class="py-3"></b-col>
        <b-col md="6" class="py-6">
          <AutoComp/>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="9" class="py-9"></b-col>
        <b-col md="3" class="py-3"> </b-col>
      </b-row>
      <b-row>
        <b-col md="5" class="py-5"><LineChartz prepath="rent" :areaName="selectedArea"/></b-col>
        <b-col md="5" class="py-5"><LineChartz prepath="sale" :areaName="selectedArea"/></b-col>
        <b-col md="2" class="py-2"></b-col>
      </b-row>
      <b-row>
        <b-col md="3" class="py-3">
          <FacetList/>
        </b-col>
        <b-col md="6" class="py-6">
          <MainComp/>
        </b-col>
        <b-col md="3" class="py-3">
          <BarChartz/>
        </b-col>
      </b-row>
    
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MainComp from '@/components/MainComp.vue'
import FacetList from '@/components/FacetList.vue'
import Slider from '@/components/Slider.vue'
import SearchBox from '@/components/SearchBox.vue'
import LineChartz from '@/components/LineChart.vue'
import BarChartz from '@/components/BarChart.vue'
import AutoComp from '@/components/AutoComp.vue'
import {mapState} from 'vuex'

export default {
  name: 'home',
  components: {
    MainComp,
    FacetList,
    Slider,
    SearchBox,
    LineChartz,
    AutoComp,
    BarChartz
  },
  computed:{
    ...mapState(['selectedArea'])
  }
}
</script>
