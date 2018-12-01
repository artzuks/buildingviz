<template>
  <div>
    <GmapMap
      :center="{lat:40.785091, lng:-73.968285}"
      :zoom="13"
      map-type-id="terrain"
      style="width: auto; height: 600px"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MainComp',
  computed: mapState([
    // map this.count to store.state.count
    'markers'
  ])
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
