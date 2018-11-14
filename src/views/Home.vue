<template>
  <div class="home">
    <MainComp/>
    <FacetList/>
  </div>
</template>

<script>
// @ is an alias to /src
import MainComp from '@/components/MainComp.vue'
import FacetList from '@/components/FacetList.vue'

export default {
  name: 'home',
  components: {
    MainComp,
    FacetList
  }
}
</script>
