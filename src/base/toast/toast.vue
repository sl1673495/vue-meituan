<template>
  <transition name="fade">
    <div class="toast" v-show="visible">
      <i :class="iconClass"></i>
      {{text}}
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
    export default {
      props: {
        iconClass: {
          type: String,
          default: ''
        },
        text: {
          type: String,
          default: ''
        },
        visible: {
          type: Boolean,
          default: false
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .toast
    position fixed
    top 50%
    left 50%
    transform translate(-50%,-50%)
    background rgba(0,0,0,.7)
    color #fff
    font-size 14px
    padding 14px
    border-radius 5px
    z-index 999

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
