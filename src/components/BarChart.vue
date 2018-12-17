<template>
  <div class="barChart">
      <h2>{{getHeading}}</h2>
      <bar-chart
        :id="getId"
        :data="getChartData"
        :xkey="xkey"
        :ykeys="ykeys"
        :labels="labels"
        resize=true
      >
      </bar-chart>
  </div>
</template>

<script>

import Raphael from 'raphael/raphael'
global.Raphael = Raphael

import { mapState } from 'vuex'
import { BarChart } from 'vue-morris'
import Slider from '@/components/Slider.vue'

export default {
  name: 'BarChartz',
  components: {
      BarChart,
      Slider
  },

  data: function(){
      return {
            xkey: 'date',
            ykeys: ['count'],
            labels: ["Permits Filed"]
    }
      
  },

  computed: {
      getId(){
          return 'barchart'
      },
      getHeading(){
          return "Permit Volume Over Time"
      },
      getChartData(){
          let counts = this.facetList.facets['filing_date_d'].values;
          if (counts.length === 0){
              return [];
          }
          let start = 2010;
          let ret = []; 
          for (;start<2019;++start){
              let count = counts[start-2010].count
              ret.push({date:start,count:count})
          }
          return ret
      },
      ...mapState(['facetList'])
  }
  
}
</script>