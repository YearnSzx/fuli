import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      component: resolve => require(['@/views/login.vue'], resolve),
    },
    {
      path: '/fuliGuide',
      name: 'fuliGuide',
      component: resolve => require(['@/components/fuliGuide.vue'], resolve),
    }
  ]
})