import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Forecast from './views/Forecast.vue'

Vue.use(Router)

export default new Router({
  linkExactActiveClass:"active",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/forecast',
      name: 'forecast',
      component: Forecast
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
