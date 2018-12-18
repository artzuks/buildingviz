<template>
    <div id="app">
        <vue-instant
            :suggestion-attribute="suggestionAttribute"
            v-model="value" 
            :disabled="false"  
            @clear="clear"
            @click-button="clickButton"
            :show-autocomplete="true" 
            :autofocus="false" 
            :suggestions="hoods" 
            name="autocomp" 
            placeholder="Enter Neighborhood to Find Price Predictions" 
            type="google">
        </vue-instant>
    </div>
</template>



<script>

import { mapState, mapActions } from 'vuex'

export default {
    name: 'AutoComp',
    data: function(){
        return {
            value: '',
            suggestionAttribute: 'areaName',
            selectedEvent: ""
        }
    },
    methods: {
        clear: function(ev) {
            console.log('clear input',this.value)
        },
        clickButton: function(ev) {
            console.log('clickButton input',this.value)
            this.updateArea(this.value)
            this.rentData(this.value)
            this.salesData(this.value)
            let subarea = this.hoods.find((e)=>e.areaName===this.value);
            if (subarea){
                this.rentData(subarea.Borough)
                this.salesData(subarea.Borough)
            }
        },
        ...mapActions(['updateArea','rentData','salesData'])
    },
    computed: {
        ...mapState(['hoods'])
    }/*,
    components: {
        'vue-instant': VueInstant.VueInstant
    }*/
}
</script>

