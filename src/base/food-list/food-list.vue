<template>

  <ul class="food-list">
    <li v-for="food in foods" class="item">
      <div class="name">
        <img :src="food.picture"/> {{food.name}}
      </div>
      <span class="number">
        × {{food.number}}
      </span>
      <span class="price">
        <span class="symbol">¥</span>{{((food.min_price * food.number * 100) | 0 ) / 100}}
      </span>
    </li>
  </ul>
</template>

<script type="text/ecmascript-6">
    export default {
      props: {
        foods: {
          type: Array,
          default: () => []
        }
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"

  .food-list
    .item
      padding 1rem
      display flex
      align-items center
      &:not(:last-child)
        border-1px(#eee)
      .name
        flex 3
        font-size $font-size-medium
        color color-text-shallow-black
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        img
          width 2.5rem
          height 2.5rem
          vertical-align middle
      .price
        flex 1
        text-align right
        color $color-price
        font-weight 700
        font-size $font-size-medium-x
        .symbol
          font-size $font-size-small-s
</style>
