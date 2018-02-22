<template>
  <transition name="slide">
    <div class="order-detail">
      <div class="header-wrapper">
        <m-header title="订单详情"></m-header>
      </div>
      <div class="content">
        <div class="header">
          <img class="shop-img" :src="order.shop.pic_url">
          <p class="state">
            订单已完成
          </p>
          <p class="desc">
            感谢您的信任，祝您用餐愉快
          </p>
        </div>
        <div class="order">
          <h1 class="shop-name">
            <img :src="order.shop.pic_url"> {{order.shop.name}}
          </h1>
          <div class="order-list">
            <food-list :foods="order.selectFoods"></food-list>
            <div class="delivery">
              <span class="title">配送费</span>
              <span class="price">
                <span class="symbol">¥</span>{{order.deliveryPrice}}
              </span>
            </div>
            <div class="total">
              <span class="text">实付</span> ¥{{order.totalPrice}}
            </div>
          </div>
        </div>

      </div>
      <div class="list-info">
        <h1 class="title">配送信息</h1>
        <ul class="list-detail">
          <li class="item">
            <div class="item-title">
              送达时间:
            </div>
            <div class="item-content">
              尽快送达（{{order.expectTime}}）
            </div>
          </li>
          <li class="item">
            <div class="item-title">
              送货地址:
            </div>
            <div class="item-content">
              <p>{{order.username}}</p>
              <p>{{order.phone}}</p>
              <p>{{order.address}}</p>
            </div>
          </li>
          <li class="item">
            <div class="item-title">
              配送方式:
            </div>
            <div class="item-content">
              商家配送
            </div>
          </li>
        </ul>
      </div>
      <div class="list-info">
        <h1 class="title">订单信息</h1>
        <ul class="list-detail">
          <li class="item">
            <div class="item-title">
              订单号:
            </div>
            <div class="item-content">
              3019696409725325389
            </div>
          </li>
          <li class="item">
            <div class="item-title">
              支付方式:
            </div>
            <div class="item-content">
             在线支付
            </div>
          </li>
          <li class="item">
            <div class="item-title">
              下单时间:
            </div>
            <div class="item-content">
             {{order.orderTime}}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import MHeader from '@/base/header/header'
  import {mapGetters} from 'vuex'
  import FoodList from '@/base/food-list/food-list'
  export default {
    components: {
      MHeader,FoodList
    },
    computed: {
      ...mapGetters(['order'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"

  .order-detail
    background #f5f5f5
    height: 100%;
    overflow: auto;
    -webkit-overflow-scrolling touch
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      transform: translate3d(100%, 0, 0)
    .header-wrapper
      overflow hidden
    .content
      margin 3.5rem 1rem 0 1rem
      background #fff
      .header
        padding 1rem 0
        text-align center
        .shop-img
          width 6rem
          height 6rem
          border-radius 50%
          margin-bottom .5rem
        .state
          font-size $font-size-large
          font-weight 700
          color $color-text-shallow-black
          margin-bottom .5rem
        .desc
          color #999
          font-size $font-size-small
      .order
        padding 1rem
        .shop-name
          color $color-text-dark-grey
          font-weight 700
          font-size $font-size-medium-x
          padding 1rem
          border-bottom .4vw solid #dfdfdf
          img
            width 2rem
            height 2rem
            margin-right .1rem
            vertical-align middle
        .order-list
          .delivery
            padding 1rem
            display flex
            justify-content space-between
            border-bottom .4vw solid #dfdfdf
            border-top 1px solid #eee
            .price
              color $color-price
              font-size $font-size-medium-x
              font-weight 700
              .symbol
                font-size $font-size-small-s
          .total
            padding 1.5rem 1rem
            text-align right
            font-size $font-size-large-x
            .text
              color $color-text-shallow-black
              font-size $font-size-medium-x


    .list-info
      background #fff
      padding 1rem
      margin 1.5rem 1rem
      color $color-text-dark-grey
      .title
        font-size $font-size-medium-x
        color $color-text-shallow-black
        line-height 3rem
      .list-detail
        .item
          padding 1rem
          display flex
          font-size $font-size-medium
          .item-title
            margin-right .5rem
          .item-content
            p
              padding-bottom .5rem
</style>
