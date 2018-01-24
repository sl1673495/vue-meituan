<template>
  <ul class="shop-list">
    <li class="item" v-for="item in data">
      <div class="img">
        <img width="100%" height="100%" :src="item.pic_url">
      </div>
      <div class="content">
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
    </li>
  </ul>
</template>

<script>
  import Star from '@/base/star/star'

  export default {
    props: {
      data : {
        type: Array,
        default: []
      }
    },
    created() {

    },
    methods: {
      _computedNum(num) {
        if(num > 999) {
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
        font-size 14rem
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        padding-bottom 5px
      .middle
        display flex
        font-size 11rem
        .star
          margin-right 5px
      .bottom
        font-size 11rem
      .distance
        position absolute
        right 0
        white-space nowrap
        font-size 11rem
</style>
