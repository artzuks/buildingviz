<template>
  <div class="searchBox">
      <gmap-autocomplete
        placeholder="Enter Neighborhood or Address You Are Moving To"
        @place_changed="setPlace"
        class="form-control form-control-lg">
      </gmap-autocomplete>
      <br>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  name: 'SearchBox',
  data: function(){
      return {
          place:""
      }
  },
  methods: {
      setPlace(place) {
        this.place = place
        this.changeMapCenter(place.geometry.location)
      },
      ...mapActions(['changeMapCenter'])
  }
  
}
</script>