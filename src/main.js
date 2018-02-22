// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import '@/common/stylus/index.styl'
import '@/common/stylus/icon-font/iconfont.css'

Vue.prototype.$http = axios

fastclick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('@/common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
