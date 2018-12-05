import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/*import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
Amplify.configure({
  API: {
    endpoints: [
        {
            name: "search",
            endpoint: "https://sgjubhupaf.execute-api.us-east-1.amazonaws.com/PROD"
        },
    ]
  }
})

Vue.use(AmplifyPlugin, AmplifyModules)
*/
Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBKZE6mnRC0e9IuGcbzGji_XEjiRZirCkY'
  }
})

Vue.use(BootstrapVue);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
