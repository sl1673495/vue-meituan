<template>
  <transition-group
    class="shop-list"
    name="list"
    tag="ul"
  >
    <li
      :key="item.id"
      :ref="'item'+ index"
      @click="selectItem(item)"
      @touchend="shopTouchEnd"
      @touchmove="shopTouchMove"
      @touchstart="shopTouchStart(index,$event)"
      class="item"
      v-for="(item,index) in data"
    >
      <div
        :ref="'img'+ index"
        class="img"
      >
        <img
          height="100%"
          v-lazy="item.pic_url"
          width="100%"
        />
        <div
          class="type-img"
          v-show="item.poi_type_icon"
        >
          <img
            :src="item.poi_type_icon"
            height="100%"
            width="100%"
          />
        </div>
      </div>
      <div
        :ref="'content'+ index"
        class="content"
      >
        <h1 class="name">{{item.name}}</h1>
        <div class="middle">
          <div class="star">
            <star
              :score="item.wm_poi_score"
              :size="size"
            ></star>
          </div>
          <div class="number">月售{{_computedNum(item.month_sale_num)}}</div>
          <div class="distance">
            {{item.mt_delivery_time}}
            <span class="shop-line">|</span>
            {{item.distance}}
          </div>
        </div>
        <div class="bottom">
          {{item.min_price_tip}}
          <span class="shop-line">|</span>
          {{item.shipping_fee_tip}}
          <span class="shop-line">|</span>
          {{item.average_price_tip}}
        </div>
        <ul class="discounts">
          <li
            :key="discount.id"
            class="dis-item"
            v-for="discount in item.discounts2"
          >
            <img
              :src="discount.icon_url"
              height="15px"
              width="15px"
            />
            {{discount.info}}
          </li>
        </ul>
      </div>
      <div
        :ref="'del'+ index"
        @click.stop="del(index)"
        class="del-item"
      >删除</div>
    </li>
  </transition-group>
</template>

<script>
import Star from "@/base/star/star"
import { prefixStyle } from "@/common/js/dom"

const transform = prefixStyle("transform")
const transition = prefixStyle("transition")
const MAX_LENGTH = 150

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  created() {},
  methods: {
    selectItem(item) {
      this.$emit("select", item)
    },
    shopTouchStart(index, e) {
      const delRef = "del" + index
      const contentRef = "content" + index
      const imgRef = "img" + index
      const delDom = this.$refs[delRef]
      const contentDom = this.$refs[contentRef]
      const imgDom = this.$refs[imgRef]
      const touch = e.touches[0]
      if (!this.touch) {
        this.touch = {}
      } else {
        if (this.touch.lastIndex !== index) {
          // 还原上一次拉动的del块
          const lastIndex = this.touch.lastIndex
          const lastDelRef = "del" + lastIndex
          const lastContentRef = "content" + lastIndex
          const lastImgRef = "img" + lastIndex
          const lastDelDom = this.$refs[lastDelRef][0]
          const lastContentDom = this.$refs[lastContentRef][0]
          const lastImgDom = this.$refs[lastImgRef][0]
          lastDelDom.style[transition] = "all .3s"
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
      const touch = e.touches[0]
      const dealtX = Math.abs(this.touch.startX - touch.clientX)
      const dealtY = Math.abs(this.touch.startClientY - touch.clientY)
      // Y方向偏移大于X方向 就直接返回
      if (dealtY > dealtX) {
        return
      } else {
        e.preventDefault()
      }
      const diffX = Math.min(MAX_LENGTH, this.touch.startX - touch.clientX)
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
        this.touch.contentDom.style[
          transform
        ] = `translate3d(-${MAX_LENGTH}px, 0, 0)`
        this.touch.imgDom.style[
          transform
        ] = `translate3d(-${MAX_LENGTH}px, 0, 0)`
      } else {
        this.touch.delDom.style.width = 0
        this.touch.contentDom.style[transform] = ``
        this.touch.imgDom.style[transform] = ``
      }
    },
    del(index) {
      this.$emit("del", index)
      const lastDelRef = "del" + index
      const lastContentRef = "content" + index
      const lastImgRef = "img" + index
      const lastDelDom = this.$refs[lastDelRef][0]
      const lastContentDom = this.$refs[lastContentRef][0]
      const lastImgDom = this.$refs[lastImgRef][0]
      lastDelDom.style[transition] = ""
      lastDelDom.style.width = 0
      lastContentDom.style[transform] = ``
      lastImgDom.style[transform] = ``
    },
    _computedNum(num) {
      if (num > 999) {
        return "999+"
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
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.shop-list {
  .item {
    position: relative;
    display: flex;
    padding: 20px 10px;
    border-1px($color-split-grey);

    &.list-leave-active {
      transition: all 0.3s;
    }

    &.list-leave-to {
      transform: translate(-100%, 0);
    }

    .img {
      position: relative;
      flex: 0 0 7rem;
      height: 5rem;

      .type-img {
        position: absolute;
        right: 0;
        top: 0;
        width: 2rem;
        height: 1.1rem;
      }
    }

    .content {
      display: flex;
      position: relative;
      flex-direction: column;
      padding: 0 10px;
      flex: 1;

      .name {
        font-size: $font-size-medium;
        white-space: nowrap;
        color: #333;
        font-weight: 700;
        font-size: $font-size-medium-x;
        margin-bottom: 0.8rem;
      }

      .middle {
        display: flex;
        font-size: $font-size-small-s;
        color: #666;
        margin-bottom: 0.8rem;

        .distance {
          position: absolute;
          right: 0;
          white-space: nowrap;
        }

        .star {
          margin-right: 5px;
        }
      }

      .bottom {
        color: #666;
        margin-bottom: 0.8rem;
        font-size: $font-size-small;
      }

      .discounts {
        color: #666;

        .dis-item {
          font-size: $font-size-small;
          padding: 0.3rem 0;

          img {
            vertical-align: middle;
          }
        }
      }
    }

    .del-item {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: $font-size-medium;
      right: 0;
      bottom: 0;
      top: 0;
      background: #d43c33;
      width: 0;
      overflow: hidden;
      color: white;
      white-space: nowrap;
    }
  }
}
</style>
