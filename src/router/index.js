import Vue from 'vue'
import Router from 'vue-router'
import fuliGuide from '@/components/fuliGuide'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'fuliGuide',
      component: fuliGuide
    },
    {
      path: "/perform",
      component: resolve => require(['@/components/perform.vue'], resolve),
    },
    {
      path: "/repast",
      component: resolve => require(['@/components/repast.vue'], resolve),
    },
    {
      path: "/serviceCenter",
      component: resolve => require(['@/components/serviceCenter.vue'], resolve),
    },
    {
      path: "/inAndOut",
      component: resolve => require(['@/components/inAndOut.vue'], resolve),
    },
    {
      path: "/wcRoom",
      component: resolve => require(['@/components/wcRoom.vue'], resolve),
    }
  ]
})



// Vue.use(VueRouter)

// const routes = [
//   {
//     path: "/",
//     redirect: "/home",
//   },
//   {
//     path: "/home",
//     component: resolve => require(['@/view/home/home.vue'], resolve),
//   },
//   {
//     path: "/OrderList/:type",
//     component: resolve => require(['@/view/Order/OrderList.vue'], resolve),
//   },
//   {
//     path: "/paystatus/:type",
//     component: resolve => require(['@/view/Order/paystatus.vue'], resolve),
//   },
//   {
//     path: "/wxLogin",
//     name: "wxLogin",
//     component: resolve => require(['@/view/login/wxLogin.vue'], resolve),
//     meta: { title: '微信授权登录' }
//   }
// ]


// const router = new VueRouter({
//   routes
// })

// export default router;