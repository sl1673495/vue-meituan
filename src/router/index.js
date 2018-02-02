import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/main/main'
import ShopDetail from '@/components/shop-detail/shop-detail'
import Foods from '@/components/foods/foods'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path:'/detail/:id/',
      name:'ShopDetail',
      component:ShopDetail,
      children: [
        {
          path: '/',
          name: 'foods',
          component: Foods
        },
        {
          path: 'foods',
          name: 'foods',
          component: Foods
        }
      ]
    }
  ]
})
