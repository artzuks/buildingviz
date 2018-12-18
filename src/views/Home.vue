<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col md="3" class="py-3">
          
        </b-col>
        <b-col md="6" class="py-6">
          <SearchBox/>
        </b-col>
        <b-col md="3" class="py-3">
          
        </b-col>
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
          <PieChartz/>
        </b-col>
      </b-row>
    
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import MainComp from '@/components/MainComp.vue'
import FacetList from '@/components/FacetList.vue'
import SearchBox from '@/components/SearchBox.vue'
import BarChartz from '@/components/BarChart.vue'
import PieChartz from '@/components/PieChart.vue'

export default {
  name: 'home',
  components: {
    MainComp,
    FacetList,
    SearchBox,
    BarChartz,
    PieChartz
  }
}
</script>
