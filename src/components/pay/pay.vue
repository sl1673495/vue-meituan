<template>
  <transition name="slide">
    <div class="pay">
      <div class="header-wrapper">
        <m-header title="支付"></m-header>
      </div>
      <div class="content-wrapper">
        <div class="order_to">
          <p class="text">
            订单配送至
          </p>
          <p class="address">
            南京市 雨花台区 京妆商务 5-501
          </p>
          <p class="user">
            小怪兽 1888888888
          </p>
        </div>
        <div class="order_desc">
          <div class="item">
            <div class="title">送达时间</div>
            <div class="content">尽快送达({{nowTime}}送达)</div>
          </div>
          <div class="item">
            <div class="title">支付方式</div>
            <div class="content">在线支付</div>
          </div>
        </div>
        <div class="order_info">
          <h1 class="shop-name">
            <img width="30px" height="30px" :src="order.shop.pic_url">{{order.shop.name}}
          </h1>
          <div class="list-wrapper">
            <food-list :foods="order.selectFoods"></food-list>
          </div>
          <div class="delivery">
        <span class="shop-icon">
          商家
        </span>
            <span class="title">
          配送费
        </span>
            <span class="price">
          <span class="symbol">¥</span>{{order.deliveryPrice}}
        </span>
          </div>
          <div class="desc">
            每单限一份优惠
          </div>
          <div class="desc">
            <p>红包(含店铺专享红包)</p>
            <p>暂时只在APP中支持</p>
          </div>
          <div class="total">
            小计 ¥<span class="num">{{totalPrice}}</span>
          </div>
        </div>
      </div>
      <div class="bottom-wrapper">
      <span class="price">
        ¥{{totalPrice}}
      </span>
        <span class="desc">
        | 配送费¥{{order.deliveryPrice}}
      </span>
        <div class="pay" @click="pay">
          去支付
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapActions} from 'vuex'
  import MHeader from '@/base/header/header'
  import FoodList from '@/base/food-list/food-list'
  import {oneDec,formatDate} from '@/common/js/util'
  import Toast from '@/base/toast/toast.js'

  export default {
      computed: {
        nowTime() {
          const deliveryTime = this.order.shop.avg_delivery_time
          const deliverySeconds = Number(deliveryTime) * 60 * 1000
          const now = +new Date()
          const resultDate = new Date(now+deliverySeconds)
          return ((resultDate.getHours() + "").length === 1 ?
                '0' + resultDate.getHours():
                resultDate.getHours())
                + ":" +
                ((resultDate.getMinutes()+ "").length === 1 ?
                  '0' + resultDate.getMinutes():
                  resultDate.getMinutes())
        },
        totalPrice() {
          let total = 0
          this.order.selectFoods.forEach(val => {
            total += val.number * val.min_price
          })
          return oneDec(total) + this.order.deliveryPrice
        },
        ...mapGetters(['order'])
      },
      methods: {
        pay() {
          let order = Object.assign({},this.order,{
            expectTime: this.nowTime,
            orderTime:formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') ,
            address: '南京市 雨花台区 京妆商务 5-501',
            username: '小怪兽',
            phone: '1888888888',
            totalPrice: this.totalPrice
          })
          this.saveOrder(order)
          this.$router.push('order')
          Toast('支付成功')
        },
        ...mapActions(['saveOrder'])
      },
      components: {
        MHeader,
        FoodList
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
 .pay
   height 100%
   overflow hidden
   &.slide-enter-active, &.slide-leave-active
     transition: all 0.3s
   &.slide-enter, &.slide-leave-to
     transform: translate3d(100%, 0, 0)
   .content-wrapper
     margin-top 3.5rem
     overflow scroll
     height calc(100% - 7.2rem)
     -webkit-overflow-scrolling touch
     .order_to
       padding 1rem
       border-bottom .5rem solid $color-split-grey
       .text
         color $color-text-grey
         margin-bottom .7rem
         .company
           border 1px solid rgba(0,0,0,.5)
           color #ff5722
           border-radius 1.33vw
       .address
         font-size $font-size-medium-x
         font-weight 700
         margin-bottom .7rem
       .user
         color color-text-shallow-black
     .order_desc
       border-bottom .5rem solid $color-split-grey
       .item
         padding 1rem
         display flex
         .title
           flex 0 0 auto
           font-size $font-size-medium-x
           color $color-text-dark-grey
         .content
           flex 1
           text-align right
           font-size $font-size-medium-x
           color $color-text-blue
     .order_info
       padding 1rem
       .shop-name
         font-weight 700
         padding 1rem 0
         font-size $font-size-large
         color $color-text-shallow-black
         img
           border-radius 50%
           vertical-align middle
       .delivery
         position relative
         border-bottom 1px solid #eee
         border-top 1px solid #eee
         padding 1rem
         .shop-icon
           background #60acf4
           color #fff
           border-radius 0.33vw
           font-size $font-size-small-s
           padding .1rem .3rem
         .title
           margin-left 1rem
         .price
           position absolute
           right 1rem
           font-size $font-size-medium-x
           .symbol
             font-size $font-size-small-s
       .desc
         display flex
         justify-content space-between
         border-bottom 1px solid #eee
         padding 1rem
         color $color-text-shallow-grey
       .total
         text-align right
         padding 1rem .5rem
         .num
           font-size $font-size-large-x
   .bottom-wrapper
     position fixed
     bottom 0
     width 100%
     height 3.7rem
     line-height 3.7rem
     padding 0 1rem
     box-sizing border-box
     background #3c3c3c
     .price
       color #fff
       font-size $font-size-large-x
       vertical-align middle
     .desc
       font-size $font-size-small
       color #999
     .pay
       position absolute
       width 7rem
       right 0
       top 0
       text-align center
       color #fff
       font-size $font-size-large
       background #00e067
       height 100%
</style>
