<template>
<div>
    <vue-slider v-bind="options"></vue-slider>
</div>
</template>
<script>
import vueSlider from 'vue-slider-component';

export default {
  components: {
    vueSlider
  },
  data () {
    return {
      value: 0,
      options: {
        
        value: [
        "2017",
        "2018"
        ],
        width: "100%",
        height: 4,
        dotSize: 14,
        min: 1980,
        max: 2018,
        interval: 3,
        disabled: false,
        show: true,
        tooltip: "always",
        piecewise: true,
        }
    }
  }
}
</script>