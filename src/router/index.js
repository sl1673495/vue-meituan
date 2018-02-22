import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home'
import Main from '@/components/main/main'
import ShopDetail from '@/components/shop-detail/shop-detail'
import Foods from '@/components/foods/foods'
import Ratings from '@/components/ratings/ratings'
import Pay from '@/components/pay/pay'
import Order from '@/components/order/order'
import OrderDetail from '@/components/order-detail/order-detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '/',
          redirect: {name :'main'}
        },
        {
          path: 'main',
          name: 'main',
          component: Main
        },
        {
          path: '/order',
          name: 'order',
          component: Order
        }
      ]
    },
    {
      path:'/detail/:id/',
      component:ShopDetail,
      children: [
        {
          path: '/',
          redirect: {name: 'foods'}
        },
        {
          path: 'foods',
          name: 'foods',
          component: Foods
        },
        {
          path: 'ratings',
          name: 'ratings',
          component: Ratings
        }
      ]
    },
    {
      path: '/pay',
      name: 'pay',
      component: Pay
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: OrderDetail
    }
  ]
})
