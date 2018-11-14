import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'


Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBKZE6mnRC0e9IuGcbzGji_XEjiRZirCkY'
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
