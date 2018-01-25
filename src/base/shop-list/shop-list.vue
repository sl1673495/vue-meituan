<template>
  <ul class="shop-list">
    <li :ref="'item'+ index"
        class="item"
        v-for="(item,index) in data"
        @touchstart="shopTouchStart(index,$event)"
        @touchmove="shopTouchMove"
        @touchend="shopTouchEnd">
      <div class="img" :ref="'img'+ index">
        <img width="100%" height="100%" v-lazy="item.pic_url">
      </div>
      <div class="content" :ref="'content'+ index">
        <h1 class="name">
          {{item.name}}
        </h1>
        <div class="middle">
          <div class="star">
            <star :size="size" :score="item.wm_poi_score"></star>
          </div>
          <div class="number">
            月售{{_computedNum(item.month_sale_num)}}
          </div>
        </div>
        <div class="bottom">
          {{item.min_price_tip}} | {{item.shipping_fee_tip}}
        </div>
        <div class="distance">
          {{item.mt_delivery_time}} | {{item.distance}}
        </div>
      </div>
      <div class="del-item" :ref="'del'+ index" @click="del(index)">
        删除
      </div>
    </li>
  </ul>
</template>

<script>
  import Star from '@/base/star/star'
  import {prefixStyle} from '@/common/js/dom'
  const transform = prefixStyle('transform')
  const transition = prefixStyle('transition')
  const MAX_LENGTH = 150

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    created() {

    },
    methods: {
      shopTouchStart(index, e) {
        const delRef = 'del' + index
        const contentRef = 'content' + index
        const imgRef = 'img' + index
        const delDom = this.$refs[delRef]
        const contentDom = this.$refs[contentRef]
        const imgDom = this.$refs[imgRef]
        const touch = e.touches[0]
        if (!this.touch) {
          this.touch = {}
        }else {
          if (this.touch.lastIndex !== index) {
            // 还原上一次拉动的del块
            const lastIndex = this.touch.lastIndex
            const lastDelRef = 'del' + lastIndex
            const lastContentRef = 'content' + lastIndex
            const lastImgRef = 'img' + lastIndex
            const lastDelDom = this.$refs[lastDelRef][0]
            const lastContentDom = this.$refs[lastContentRef][0]
            const lastImgDom = this.$refs[lastImgRef][0]
            lastDelDom.style[transition] = 'all .3s'
            lastDelDom.style.width = 0
            lastContentDom.style[transform] = ``
            lastImgDom.style[transform] = ``
          }
          this.touch = {}
        }
        this.touch.lastIndex = index
        this.touch.startX = touch.clientX
        this.touch.startClientY = touch.clientY
        this.touch.delDom = delDom[0]
        this.touch.contentDom = contentDom[0]
        this.touch.imgDom = imgDom[0]
        this.touch.delDom.style[transition] = ``
        this.touch.imgDom.style[transition] = ``
        this.touch.contentDom.style[transition] = ``
      },
      shopTouchMove(e) {
        const leaveTop = document.documentElement.scrollTop || document.body.scrollTop
        if (leaveTop !== 0) {
          // 阻止shoplist的move事件冒泡到main组件的move事件
          e.stopPropagation()
        }
        const touch = e.touches[0]
        const dealtX = Math.abs(this.touch.startX - touch.clientX)
        const dealtY = Math.abs(this.touch.startClientY - touch.clientY)
        // Y方向偏移大于X方向 就直接返回
        if (dealtY > dealtX) {
          return
        }else {
          e.preventDefault()
        }
        const diffX = Math.min(MAX_LENGTH ,this.touch.startX - touch.clientX)
        this.touch.delDom.style.width = `${diffX}px`
        this.touch.contentDom.style[transform] = `translate3d(-${diffX}px, 0, 0)`
        this.touch.imgDom.style[transform] = `translate3d(-${diffX}px, 0, 0)`
        // 记录偏移记录 用于end
        this.touch.diffX = diffX
      },
      shopTouchEnd(e) {
        this.touch.delDom.style[transition] = `all 0.3s`
        this.touch.imgDom.style[transition] = `all 0.3s`
        this.touch.contentDom.style[transition] = `all 0.3s`

        // 拖动超过40%
        if (this.touch.diffX / MAX_LENGTH > 0.4) {
          this.touch.delDom.style.width = `${MAX_LENGTH}px`
          this.touch.contentDom.style[transform] = `translate3d(-${MAX_LENGTH}px, 0, 0)`
          this.touch.imgDom.style[transform] = `translate3d(-${MAX_LENGTH}px, 0, 0)`
        }else {
          this.touch.delDom.style.width = 0
          this.touch.contentDom.style[transform] = ``
          this.touch.imgDom.style[transform] = ``
        }
      },
      del(index) {
        this.$emit('del',index)
        const lastDelRef = 'del' + index
        const lastContentRef = 'content' + index
        const lastImgRef = 'img' + index
        const lastDelDom = this.$refs[lastDelRef][0]
        const lastContentDom = this.$refs[lastContentRef][0]
        const lastImgDom = this.$refs[lastImgRef][0]
        lastDelDom.style[transition] = ''
        lastDelDom.style.width = 0
        lastContentDom.style[transform] = ``
        lastImgDom.style[transform] = ``
      },
      _computedNum(num) {
        if (num > 999) {
          return '999+'
        }
        return num
      }
    },
    data() {
      return {
        size: 24
      }
    },
    components: {
      Star
    }
  }
</script>

<style lang="stylus" scoped>
  .item
    position relative
    display flex
    padding 20px 10px
    border-bottom 1px solid #efefef
    .img
      flex 0 0 80px
    .content
      display flex
      position relative
      flex-direction column
      justify-content space-around
      padding 0 10px
      flex 1
      .name
        font-size 14px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        padding-bottom 5px
      .middle
        display flex
        font-size 11px
        .star
          margin-right 5px
      .bottom
        font-size 11px
      .distance
        position absolute
        right 0
        white-space nowrap
        font-size 11px
    .del-item
      position absolute
      display flex
      justify-content center
      align-items center
      font-size 15px
      right 0
      bottom 0
      top 0
      background #d43c33
      width 0
      overflow: hidden
      color white
      white-space nowrap
</style>
