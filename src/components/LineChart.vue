<template>
  <div class="lineChart">
      <h2>{{getHeading}}</h2>
      <Slider :sliderId="prepath"/>
      <line-chart
        :id="getId"
        :data="getChartData"
        :xkey="xkey"
        :ykeys="ykeys"
        :labels="labels"
        resize=true
      >
      </line-chart>
  </div>
</template>

<script>

import Raphael from 'raphael/raphael'
global.Raphael = Raphael

import { mapState, mapActions, mapGetters } from 'vuex'
import { LineChart } from 'vue-morris'
import Slider from '@/components/Slider.vue'

export default {
  name: 'LineChartz',
  components: {
      LineChart,
      Slider
  },
  mounted: function(){
      this.rentData(this.areaName);
      this.salesData(this.areaName);
  },
  props:[
      'prepath',
      'areaName'
  ],
  data: function(){
      return {
            xkey: 'date',
            ykeys: ['actual','prediction'],
            labels: ["Actual","Prediction"]
    }
      
  },
  methods: {
      setPlace(place) {
        this.place = place
      },
      ...mapActions(['rentData','salesData'])
  },
  computed: {
      getId(){
          return 'chart' + this.prepath + this.areaName
      },
      getHeading(){
          return this.prepath==='rent'?this.areaName + " Median Asking Rent": this.areaName + " Median Sales Price"
      },
      getChartData(){
          let hood = this.hoods.find((h)=>h.areaName===this.areaName);
          let sliderValues = this.sliders[this.prepath];
          let start = new Date(sliderValues[0],0,1)
          let end = new Date(sliderValues[1],11,31)
          if (hood){
              if (this.prepath === 'rent'){
                  return hood.rentactual.concat(hood.rentprediction).filter((el)=>el.dateObj>start&&el.dateObj<end);
              }else{
                  return hood.saleactual.concat(hood.saleprediction).filter((el)=>el.dateObj>start&&el.dateObj<end);
              }
              
          }
      },
      ...mapState(['hoods','sliders'])
  }
  
}
</script>