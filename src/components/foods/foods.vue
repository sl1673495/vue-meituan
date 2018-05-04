<template>
  <div class="foods" ref="foods">
    <div class="food-wrapper" ref="foodWrapper">
      <ul class="menu" id="menuList" ref="menuList"
        @touchstart="menuTouchStart"
        @touchend="menuTouchEnd">
        <li class="type" :class="{'active': index === activeIndex}" v-for="(food,index) in foods"
            @click="selectMenu(index)">
          <img v-if="food.icon" :src="food.icon" width="15px" height="15px"> {{food.name}}
          <span class="badge" v-if="getBoughtNumber(index)">
            {{getBoughtNumber(index)}}
          </span>
        </li>
      </ul>
      <ul class="food-list" ref="foodList" id="foodList"
        @touchstart="foodTouchStart"
        @touchend="foodTouchEnd">
        <transition name="fade">
          <div class="one-type" v-show="refreshTag">
            <h2 class="title">
              {{activeList.name}}
            </h2>
            <ul>
              <li @click="showFood(spu)" class="food-item" v-for="spu in activeList.spus">
                <div class="icon">
                  <img v-lazy="spu.picture" width="100%" height="100%">
                </div>
                <div class="content">
                  <h2 class="name">{{spu.name}}</h2>
                  <div class="price">
                    <span class="symbol">¥</span>{{spu.min_price}}
                  </div>
                  <div class="control">
                    <cart-control :food="spu"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </ul>
      <shop-cart
        :deliveryPrice="info.shipping_fee"
        :minPrice="info.min_price"
        :selectFoods="selectFoods"
        @pay="pay">
      </shop-cart>
      <middle-modal
        :visible.sync="foodShow"
        width="80%">
        <div class="food-detail">
          <div class="img-wrapper">
            <img :src="selectFood.picture">
          </div>
          <div class="content">
            <h2 class="name">
              {{selectFood.name}}
            </h2>
            <div class="desc">
              月售{{selectFood.tread_num}}份 {{selectFood.praise_content}}
            </div>
            <div class="bottom">
              <div class="price">
                <span class="symbol">￥</span>{{selectFood.min_price}}
              </div>
              <div class="control">
                <cart-control :food="selectFood"></cart-control>
              </div>
            </div>
          </div>
        </div>
      </middle-modal>

      <middle-modal
        visible.sync="bulletinShow"
        width="70%">
      </middle-modal>
    </div>
  </div>
</template>

<script>
  import {getFoods} from '@/common/api/food'
  import CartControl from '@/base/cart-control/cart-control'
  import MiddleModal from '@/base/middle-modal/middle-modal'
  import ShopCart from '@/base/shopcart/shopcart'
  import {mapGetters,mapMutations} from 'vuex'
  const HEADER_HEIGHT = '12rem'

  export default {
    created() {
      this.getFoods()
    },
    mounted() {
      this._listEvent()
    },
    data() {
      return {
        info: {},
        foods: [],
        activeIndex: 0,
        activeList: {},
        refreshTag: true,
        foodShow: false,
        selectFood: {}
      }
    },
    computed: {
      selectFoods() {
        let res = []
        this.foods.forEach(food => {
          food.spus.forEach(spu => {
            if (spu.number) {
              res.push(spu)
            }
          })
        })
        return res
      },
      ...mapGetters([
        'shop'
      ])
    },
    methods: {
      getFoods() {
        getFoods().then(res => {
          this.info = res.data.data.poi_info
          this.foods = res.data.data.food_spu_tags
          this.activeList = this.foods[0]
        })
      },
      getBoughtNumber(index){
        let total = 0;
        this.foods[index].spus.forEach(val => {
          total += val.number || 0
        })
        return total || ''
      },
      selectMenu(index) {
        if (index === this.activeIndex) {
          return
        }
        this.refreshTag = false
        this.activeList = this.foods[index]
        this.activeIndex = index
        setTimeout(() => {
          this.refreshTag = true
        }, 200)
      },
      showFood(food) {
        this.foodShow = true
        this.selectFood = food
      },
      pay() {
        const order = {
          selectFoods: this.selectFoods,
          deliveryPrice: this.info.shipping_fee,
          shop: this.shop
        }
        this.setOrder(order)
        this.$router.push('/pay')
      },
      foodTouchStart() {
        this.$emit('foodTouchStart')
      },
      foodTouchEnd() {
        this.$emit('foodTouchEnd')
      },
      menuTouchStart() {
        this.$emit('menuTouchStart')
      },
      menuTouchEnd() {
        this.$emit('menuTouchEnd')
      },
      _scrollToTop(dom) {
        dom.addEventListener('scroll', e=> {
          if (dom.scrollTop <= 0) {
            this.$emit('scrollToTop')
          }
        })
      },
      _listEvent() {
        const foodList = this.$refs.foodList
        const menuList = this.$refs.menuList
        this._scrollToTop(foodList)
        this._scrollToTop(menuList)
      },
      ...mapMutations({
        setOrder: 'SET_ORDER'
      })
    },
    components: {
      CartControl,
      MiddleModal,
      ShopCart
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"

  .foods
    position relative
    height calc(100% - 14.5rem - 3.7rem)
    .food-wrapper
      display flex
      width 100%
      height 100%
      .menu
        flex 0 0 7rem
        height 100%
        overflow-y auto
        -webkit-overflow-scrolling: touch;
        background $color-grey-background
        .type
          position relative
          height 4rem
          line-height 4rem
          text-align center
          font-size .9rem
          color $color-text-dark-grey
          &.active
            background #fff
          img
            vertical-align middle
          .badge
            position absolute
            right .5rem
            top .5rem
            padding .05rem .3rem
            line-height 1rem
            color #fff
            font-weight 700
            font-size .7rem
            border-radius .7rem
            background: $color-red
      .food-list
        flex 1
        overflow-y scroll
        -webkit-overflow-scrolling: touch;
        .one-type
          .title
            height 1.7rem
            line-height 1.7rem
            text-align center
            color $color-text-grey
            font-size $font-size-medium
            border-left 2px solid #d9dde1;
            background $color-grey-background
          .food-item
            margin 1rem
            padding-bottom 1rem
            display flex
            border-1px($color-split-grey)
            .icon
              flex 0 0 6rem
              vertical-align top
            .content
              flex 1
              display flex
              position relative
              justify-content space-between
              flex-direction column
              overflow hidden
              padding 0 .5rem
              .name
                font-size $font-size-medium
                font-weight bold
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
              .price
                font-size $font-size-medium-x
                font-weight bold
                color $color-price
                .symbol
                  font-size .7rem
              .control
                position absolute
                right 0
                bottom 0



  .food-detail
    .img-wrapper
      position relative
      padding-top 100%
      img
        position absolute
        width 100%
        height 100%
        top 0
        left 0
        border-radius 1.066667vw 1.066667vw 0 0
    .content
      padding 1rem
      .name
        font-weight bold
        font-size $font-size-medium
        margin-bottom .5rem
      .desc
        font-size $font-size-small
        color $color-text-grey
        margin-bottom 2rem
      .bottom
        display flex
        justify-content space-between
        align-items center
        .price
          font-size $font-size-medium-x
          color $color-price
          font-weight bold
        .symbol
          font-size .7rem

</style>
