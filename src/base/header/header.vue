<template>
  <div class="_header">
    {{title}}
    <div class="back" @click="back">
      <i class="icon-back"></i>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props: {
        title: {
          type: String,
          default: ''
        }
      },
      methods: {
        back() {
          this.$router.back()
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"

  ._header
    position fixed
    width 100%
    height 3.5rem
    line-height 3.5rem
    background-image: linear-gradient(90deg,#0af,#0085ff);
    text-align center
    color #fff
    z-index 1
    font-size $font-size-large
    font-weight 700
    .back
      display table
      position absolute
      left 0
      top 0
      height 100%
      i
        display table-cell
        vertical-align middle
        font-size 1.5rem
        padding 0 .5rem
</style>
