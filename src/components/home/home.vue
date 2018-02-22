<template>
  <div class="home">
    <div class="container">
      <router-view />
    </div>
    <div class="bottom-wrapper">
      <ul class="bottom-bar">
        <router-link to="main" tag="li" class="item">
          <div class="icon">
            <i class="iconfont icon-shangjia"></i>
          </div>
          <div class="text">
            商家
          </div>
        </router-link>
        <router-link to="order" tag="li" class="item">
          <div class="icon">
            <i class="iconfont icon-dingdan"></i>
          </div>
          <div class="text">
            订单
          </div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"
 .home
   height 100%
   overflow hidden
  .container
    height 100%
    overflow hidden
    margin-bottom 3rem
  .bottom-wrapper
    height 3.7rem
  .bottom-bar
    position fixed
    bottom 0
    width 100%
    display flex
    padding .5rem 0
    box-shadow: 0 -.266667vw .533333vw rgba(0,0,0,.1);
    background #fff
    .item
      flex 1
      text-align center
      color $color-text-grey
      &.router-link-active
        color #0089dc
      .icon
        margin-bottom .3rem
        i
          font-size 1.5rem
</style>
