<template>
  <div class="foods" ref="foods">
    <div class="food-wrapper">
      <ul class="menu">
        <li class="type" :class="{'active': index === activeIndex}" v-for="(food,index) in foods"
            @click="selectMenu(index)">
          <img v-if="food.icon" :src="food.icon" width="15px" height="15px"> {{food.name}}
          <span class="badge" v-if="getBoughtNumber(index)">
            {{getBoughtNumber(index)}}
          </span>
        </li>
      </ul>
      <ul class="food-list" ref="foodList">
        <transition name="fade">
          <div class="one-type" v-show="refreshTag">
            <h2 class="title">
              {{activeList.name}}
            </h2>
            <ul>
              <li class="food-item" v-for="spu in activeList.spus">
                <div class="icon">
                  <img v-lazy="spu.picture" width="100%" height="100%">
                </div>
                <div class="content">
                  <h2 class="name">{{spu.name}}</h2>
                  <div class="price">
                    <span class="symbol">￥</span>{{spu.min_price}}
                  </div>
                  <div class="control">
                    <cart-control :food="spu" @add="addFood(spu)"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </transition>
      </ul>

    </div>
  </div>
</template>

<script>
  import {getFoods} from '@/common/api/food'
  import CartControl from '@/base/cart-control/cart-control'

  export default {
    created() {
      this.getFoods()
    },
    mounted() {

    },
    computed: {},
    data() {
      return {
        data: {},
        foods: [],
        activeIndex: 0,
        activeList: {},
        refreshTag: true
      }
    },
    methods: {
      getFoods() {
        getFoods().then(res => {
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
        }, 100)

      },
      addFood(food) {
        if (!food.number) {
          this.$set(food, 'number', 1)
          return
        }
        food.number ++
      }
    },
    components: {
      CartControl
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"

  .fade-enter-active {
    transition: opacity .5s;
  }

  .fade-enter /* .fade-leave-active below version 2.1.8 */
  {
    opacity: 0;
  }

  .foods
    position relative
    height calc(100% - 16.5rem)
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
            background-image: linear-gradient(-90deg,#ff7416,#ff3c15 98%);
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
                color #f60
                .symbol
                  font-size .7rem
              .control
                position absolute
                right 0
                bottom 0
</style>
