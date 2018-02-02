<template>
  <transition name="slide">
    <div class="shop-detail">
      <div class="header">
        <div class="content-wrapper">
          <div class="avatar">
            <img :src="shop.pic_url" width="100%" height="100%">
          </div>
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
              美团专送/{{shop.mt_delivery_time}}送达
            </div>
            <div class="support">
              支持开发票
            </div>
          </div>
        </div>
        <div class="background">
          <img :src="shop.pic_url" width="100%" height="100%">
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

  export default {
    computed: {
      ...mapGetters([
        'shop'
      ])
    },
    methods: {
      back() {
        this.$router.push("/")
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
      height 10rem
      color: #fff;
      background: rgba(7, 17, 27, 0.5);
      .background
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: -1
        filter: blur(10px)
      .content-wrapper
        padding 2.5rem 1rem 1.5rem 2rem
        .avatar
          display inline-block
          vertical-align middle
          width 5rem
          height 5rem
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
            font-size $font-size-small
            margin-bottom 0.8rem
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
