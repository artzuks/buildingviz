<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col md="9" class="py-9">
          <Slider/>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="9" class="py-9">
          <MainComp/>
        </b-col>
      <b-col md="3" class="py-3">
        <FacetList/>
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

export default {
  name: 'home',
  components: {
    MainComp,
    FacetList,
    Slider
  }
}
</script>
