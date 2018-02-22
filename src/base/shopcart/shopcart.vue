<template>
  <div>
    <div class="shopcart" @click="toggleList">
      <div class="icon-wrapper">
        <div class="outer" :class="{'high-light' : totalCount > 0}">
          <i class="icon-sell-shopping_cart" :class="{'high-light' : totalCount > 0}"></i>
          <div class="badge" v-show="totalCount">
            {{totalCount}}
          </div>
        </div>
      </div>
      <div class="desc">
        <div class="price">
          ¥{{totalPrice}}
        </div>
        <div class="delivery">
          配送费¥{{deliveryPrice}}
        </div>
      </div>
      <div class="pay" :class="payCls" @click.stop="pay">
        {{payDesc}}
      </div>

    </div>
    <transition name="fade">
      <div class="mask" v-show="listShow" @click="hide" @touchmove.prevent.stop></div>
    </transition>
    <transition name="fold">
      <div class="shop-list" v-show="listShow" @touchmove.stop>
        <div class="header">
          <h2 class="title">
            已选商品
          </h2>
        </div>
        <transition-group name="list" tag="ul" class="list-wrapper">
          <li :key="food.name" class="item" v-for="food in selectFoods">
            <div class="food">
              <div class="img">
                <img :src="food.picture">
              </div>
              <div class="name">
                {{food.name}}
              </div>
            </div>
            <div class="price">
              ¥{{_calcPrice(food)}}
            </div>
            <div class="control">
              <cart-control :food="food"></cart-control>
            </div>
          </li>
        </transition-group>
      </div>
    </transition>
  </div>

</template>

<script type="text/ecmascript-6">
  import CartControl from '@/base/cart-control/cart-control'
  import {oneDec} from '@/common/js/util'

  export default {
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        listShow: false
      }
    },
    methods: {
      toggleList() {
        if (!this.totalCount) {
          return
        }
        this.listShow = !this.listShow
      },
      hide() {
        this.listShow = false
      },
      pay() {
        if (this.totalPrice >= this.minPrice) {
          this.$emit('pay')
        }
      },
      _calcPrice(food) {
        return oneDec(food.min_price * food.number)
      }
    },
    computed: {
      totalCount() {
        let count = 0
        this.selectFoods.forEach(val => {
          count += val.number
        })
        return count
      },
      totalPrice() {
        let total = 0
        this.selectFoods.forEach(val => {
          total += val.number * val.min_price
        })
        return oneDec(total)
      },
      payCls() {
        return this.totalPrice >= this.minPrice ? 'enough' : 'not-enough'
      },
      payDesc() {
        if (!this.selectFoods.length) {
          return `¥${this.minPrice}起送`
        }
        if (this.totalPrice < this.minPrice) {
          let diff =   this.minPrice - this.totalPrice
          return `还差${oneDec(diff)}元`
        }
        return `去结算`
      },
    },
    watch: {
      selectFoods(newFoods) {
        if (!newFoods.length) {
          this.hide()
        }
      }
    },
    components: {
      CartControl
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"

  .shopcart
    display flex
    position fixed
    bottom 0
    left 0
    width 100%
    height 3.7rem
    z-index 50
    background rgba(61, 61, 63, .9)
    .icon-wrapper
      position relative
      flex 0 0 6rem
      .outer
        position absolute
        width 4rem
        height 4rem
        border-radius 50%
        top -1rem
        bottom 0
        right 0
        left 0
        margin auto
        background-image radial-gradient(circle, #363636 5.666667vw, #444 0)
        &.high-light
          background $color-yellow-weak
        .icon-sell-shopping_cart
          position absolute
          font-size 2.1rem
          color #80858a
          left 50%
          top 50%
          transform translate(-50%, -50%)
          &.high-light
            color #fff
        .badge
          position absolute
          min-width 1.5rem
          text-align center
          color #fff
          right 0
          border-radius .5rem
          background $color-red
    .desc
      flex 1
      display flex
      flex-direction column
      justify-content center
      .price
        font-size $font-size-large
        color #fff
        margin-bottom .3rem
      .delivery
        font-size $font-size-small-s
        color $color-text-grey
    .pay
      flex 0 0 7rem
      text-align center
      font-weight 700
      line-height 3.7rem
      color #fff
      &.not-enough
        background #535356
        font-size $font-size-medium
      &.enough
        background $color-yellow-weak
        font-size $font-size-medium-x
  .mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    background rgba(7,17,27,0.6)
  .shop-list
    position fixed
    z-index 45
    left 0
    bottom 3.7rem
    width 100%
    background #fff
    &.fold-enter-active, &.fold-leave-active
      transition: all 0.3s
    &.fold-enter, &.fold-leave-active
      transform: translate3d(0, 100%, 0)
    .header
      height 2.5rem
      line-height 2.5rem
      color $color-text-grey
      background $color-grey-background
      padding 0 1.5rem
      .title
        font-size $font-size-medium-x
    .list-wrapper
      max-height 50vh
      overflow-y auto
      -webkit-overflow-scrolling: touch
      .item
        display flex
        align-items center
        border-1px($color-split-grey)
        &.list-enter-active, &.list-leave-active
          transition: all 0.3s
        &.list-enter, &.list-leave-to
          transform: translate(-100% ,0)
        .food
          padding 1rem 1.5rem
          display flex
          align-items center
          .img
            flex 0 0 3rem
            img
              width 3rem
              height 3rem
              border-radius 50%
              vertical-align middle
              margin-right .3rem
          .name
            flex 1
        .price
          flex 1
          text-align right
          padding-right 3rem
          color $color-price
          font-weight 700
          font-size $font-size-medium-x
        .control
          flex 0 0 7rem
</style>
