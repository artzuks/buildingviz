<template>
  <div class="pieChart">
      <h5>{{getHeading}}</h5>
      <donut-chart
        :id="getId"
        :data="getChartData"
        resize=true
        v-on:click="clicked"
      >
      </donut-chart>
  </div>
</template>

<script>

import Raphael from 'raphael/raphael'
global.Raphael = Raphael

import { mapState, mapActions } from 'vuex'
import { DonutChart } from 'vue-morris'
import Slider from '@/components/Slider.vue'
var _ = require('lodash');

export default {
  name: 'PieChartz',
  components: {
      DonutChart,
      Slider
  },
  mounted:function(){
      Raphael.click(this.clicked)
      $( this.getId ).click(this.clicked);
  },
  data: function(){
      return {
            xkey: 'date',
            ykeys: ['count'],
            labels: ["Permits Filed"]
    }
      
  },
    methods: {
        clicked:_.debounce(function(ev){
            console.log('clicked',ev)
            if (ev && ev.path[2].id === this.getId){
                this.toggleExpFilter();
                this.refreshFacets();
            }
        },100),
        ...mapActions(['toggleExpFilter','refreshFacets'])
    },
  computed: {
      getId(){
          return 'piechart'
      },
      getHeading(){
          return "Active Permits"
      },
      getChartData(){
          let counts = this.facetList.facets['expiration_date_d'].values;
          if (counts.length !== 2){
              return [];
          }
          return [{label:"Expired",value:counts[0].count},
                  {label:"Active",value:counts[1].count}]
      },
      ...mapState(['facetList'])
  }
  
}
</script>

<style>
text {
color:#888888;
fill:#888888;
}

</style>