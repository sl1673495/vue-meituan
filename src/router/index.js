import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
