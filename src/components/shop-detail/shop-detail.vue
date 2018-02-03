<template>
  <transition name="slide">
    <div class="shop-detail">
      <div class="header">
        <div class="background">
          <img :src="shop.pic_url" width="100%" height="100%">
        </div>
        <div class="avatar">
          <img :src="shop.pic_url" width="100%" height="100%">
        </div>
        <div class="content-wrapper">
          <div class="content">
            <h1 class="title">
              <span class="icon" v-show="shop.poi_type_icon">
                <img :src="shop.poi_type_icon" width="30px" height="15px">
              </span>
              <span class="name">
                {{shop.name}}
              </span>
            </h1>
            <div class="describe">
              <span class="item">{{data.poi_info.app_delivery_tip}}</span>
              <span class="item">{{data.poi_info.delivery_time_tip}}送达</span>
              <span class="item">{{data.poi_info.min_price_tip}}</span>
            </div>
            <div class="bulletin">
              {{data.poi_info.bulletin}}
            </div>
          </div>
        </div>
        <div class="back-icon" @click="back">
          <i class="icon-back"></i>
        </div>
      </div>
      <div class="notify">
        <img src="http://p0.meituan.net/xianfu/c2c0f31d0ebf0f60af115d058169c492992.png" width="15px" height="15px">
        有机会领取商家代金券
      </div>
      <div class="tab-bar">
        <router-link :to="{name:'foods'}" class="tab-item">
          <span class="text">
            点菜
          </span>
        </router-link>
        <a class="tab-item">
          <span class="text">
            评价
          </span>
        </a>
        <a class="tab-item">
          <span class="text">
            商家
          </span>
        </a>
      </div>
      <router-view/>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import {getFoods} from '@/common/api/food'

  export default {
    computed: {
      ...mapGetters([
        'shop'
      ])
    },
    created() {
      this.getData()
    },
    data() {
      return {
        data: []
      }
    },
    methods: {
      back() {
        this.$router.push("/")
      },
      getData() {
        getFoods().then(res => {
          this.data = res.data.data
        })
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)

  .shop-detail
    height 100%
    background #fff
    overflow-y hidden
    .header
      position relative
      width 100%
      height 12rem
      .background
        height: 30%
        filter: blur(10px)
      .avatar
        position absolute
        top 1rem
        left 50%
        transform translateX(-50%)
        width 5rem
        height 4rem
      .content-wrapper
        padding 2.5rem 1rem 1.5rem 2rem
        text-align center
        .content
          display inline-block
          vertical-align middle
          font-size 0
          margin-left 0.5rem
          .title
            margin-bottom 0.8rem
            .icon
              vertical-align middle
            .name
              font-size 1.1rem
              font-weight bold
          .describe
            font-size 0
            margin-bottom 0.8rem
            .item
              font-size $font-size-small
              margin-right .5rem
          .bulletin
            width 15rem
            color $color-text-grey
            white-space nowrap
            overflow-x hidden
            padding .1rem
            text-overflow ellipsis
            margin-bottom 0.8rem
            font-size $font-size-small
          .support
            font-size $font-size-small
      .back-icon
        position absolute
        left 0.5rem
        top 0.5rem
        .icon-back
          font-size 1.4rem
    .notify
      background #FFF8E8
      height 2rem
      line-height 2rem
      padding 0 .5rem
      font-size $font-size-small
      img
        vertical-align middle
    .tab-bar
      display flex
      height 2.5rem
      line-height 2.5rem
      border-1px($color-split-grey)
      .tab-item
        display block
        text-align center
        flex 1
        &.router-link-active .text
          border-bottom: 4px solid #FFD161;
        .text
          display inline-block
          height 2.2rem
          padding 0 .7rem
</style>
