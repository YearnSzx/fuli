// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'
import axios from 'axios'
import MintUI from 'mint-ui'
import * as cookie from '@/utils/cookie'
Vue.prototype.$cookie = cookie
Vue.use(MintUI)
import VueAwesomeSwiper from 'vue-awesome-swiper'

import { Navbar, TabItem } from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);


// import style
import 'swiper/dist/css/swiper.css'
// If you use Swiper 6.0.0 or higher
// import 'swiper/swiper-bundle.css'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  $,
  components: { App },
  template: '<App/>'
})
