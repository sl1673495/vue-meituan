<template>
  <div class="loading-wrapper">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .loading-wrapper
    width: 100%
    display flex
    align-items center
    justify-content center
    .desc
      line-height: 20px
      font-size: $font-size-small
</style>
