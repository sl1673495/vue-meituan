<template>
  <div class="order">
    <div class="head-wrapper">

      <m-header title="我的订单"></m-header>
    </div>
    <div class="content">
      <ul class="order-list">
        <li class="order-item" @click="selectOrder(order)" v-for="(order,index) in orderHistory">
          <div class="pic">
            <img :src="order.shop.pic_url">
          </div>
          <div class="info">
            <div class="name">
              <h1 class="title">
                {{order.shop.name}}
              </h1>
              <p class="state">
                订单已完成
              </p>
            </div>
            <div class="time">
              {{order.orderTime}}
            </div>
            <div class="order-detail">
              <div class="desc">
                <div class="food">
                  <span class="food-name">
                  {{order.selectFoods[0].name}}
                </span>
                  <span class="other" v-if="order.selectFoods.length > 1">
                  等{{order.selectFoods.length}}件商品
                </span>
                </div>
                <div class="price">
                  ¥{{order.totalPrice}}
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from 'vuex'
  import MHeader from '@/base/header/header'
  export default {
    computed: {
      ...mapGetters(['orderHistory'])
    },
    methods: {
      selectOrder(order) {
        this.setOrder(order)
        this.$router.push('order-detail')
      },
      ...mapMutations({
        setOrder: 'SET_ORDER'
      })
    },
    components: {
      MHeader
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"

 .order
   overflow hidden
   height 100%
   background #f5f5f5
  .head-wrapper
    height 3.5rem
  .content
    height calc(100% - 7.2rem)
    overflow-y auto
    -webkit-overflow-scrolling touch
    .order-list
      .order-item
        padding 1rem
        display flex
        background #fff
        margin 1rem 0
        .pic
          flex 0 0 3rem
          img
            width 100%
            height auto
        .info
          flex 1
          padding-left 1rem
          .name
            display flex
            justify-content space-between
            align-items center
            margin-bottom .3rem
            .title
              font-size $font-size-medium-x
              color $color-text-shallow-black
            .state
              font-size $font-size-small
              color $color-text-shallow-black
          .time
            font-size $font-size-small
            color $color-text-dark-grey
          .order-detail
            padding 1.5rem 0
            .desc
              display flex
              justify-content space-between
              color $color-text-dark-grey
              .food
                .food-name
                  display inline-block
                  max-width 10rem
                  overflow hidden
                  white-space nowrap
                  text-overflow ellipsis
                  vertical-align middle
                .other
                  display inline-block
                  vertical-align middle
              .price
                font-size $font-size-medium-x
                color $color-price
</style>
