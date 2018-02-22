<template>
  <transition name="fade">
    <div class="middle-modal" v-show="visible" @touchmove.prevent.stop>
      <div class="modal-mask" @click="hide">

      </div>
      <div class="modal-content" ref="content">
        <slot>

        </slot>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: ''
      }
    },
    mounted() {
      this._calcHeight()
    },
    methods: {
      hide() {
        this.$emit('update:visible', false)
      },
      _calcHeight() {
        this.$refs.content.style.width = this.width
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>


  .middle-modal
    position fixed
    top 0
    left 0
    bottom 0
    right 0
    z-index 55
    .modal-mask
      width 100%
      height 100%
      background rgba(0, 0, 0, .5)
    .modal-content
      position absolute
      left 50%
      top 50%
      background #fff
      border-radius 1.066667vw
      transform translate(-50%, -50%)
</style>
