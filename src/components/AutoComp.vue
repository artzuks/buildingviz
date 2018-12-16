<template>
    <div id="app">
        <vue-instant
            :suggestion-attribute="suggestionAttribute"
            v-model="value" 
            :disabled="false"  
            @clear="clear"
            @enter="enter"
            @click-button="clickButton"
            :show-autocomplete="true" 
            :autofocus="false" 
            :suggestions="hoods" 
            name="autocomp" 
            placeholder="Enter Neighborhood" 
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
        },
        enter: function(ev) {
            console.log('enter',this.value)
        },
        ...mapActions(['updateArea','rentData','salesData'])
    },
    computed: {
        ...mapState(['hoods']),
        suggestions: function (){
            return this.hoods.map((el)=>el.areaName)
        }
    }/*,
    components: {
        'vue-instant': VueInstant.VueInstant
    }*/
}
</script>

