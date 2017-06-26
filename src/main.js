import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'
Vue.use(VueResource)

import VueRouter from 'vue-router'
Vue.use(VueRouter)


import ProjectRouts from './routes'
const router = new VueRouter({
  //mode: 'history',
  routes: ProjectRouts,
  linkActiveClass: 'active'
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
