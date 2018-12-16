<template>
<div>
    <vue-slider v-bind="options" v-model="value"></vue-slider>
</div>
</template>
<script>
import vueSlider from 'vue-slider-component';

export default {
  components: {
    vueSlider
  },
  props: [
    'start',
    'end',
    'sliderId'
  ],
  data () {
    return {
      options: {
        width: "100%",
        height: 4,
        dotSize: 14,
        min: 2010,
        max: 2020,
        interval: 1,
        disabled: false,
        show: true,
        tooltip: "always",
        piecewise: true,
        }
    }
  },
  computed: {
    value:{
      get () {
        return this.$store.state.sliders[this.sliderId];
      },
      set (value) {
        this.$store.commit('updateSlider', {name:this.sliderId,val:value})
      }
    }
  }
}
</script>