<template>
  <div class="search-box">
      <i class="icon-search"></i>
      <input v-model="query" type="text" class="search-input" :placeholder="placeholder"/>
      <i @touchstart="clear" class="icon-dismiss" v-show="query"></i>
  </div>
</template>

<script>
    export default {
        props: {
          placeholder: {
            type: String,
            default: '搜索商家'
          }
        },
        created() {

        },
        methods: {
          clear() {
            this.query = ''
          }
        },
        data() {
            return {
              query: ''
            }
        }
    }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"

  .search-box
    display flex
    align-items center
    height 28px
    padding 0 5px
    background #fff
    border-radius 3px
    .icon-search
      font-size 24px
      color $color-grey
    .search-input
      flex 1
      height 100%
      outline: 0
    .icon-dismiss
      font-size 14px
      color $color-grey
</style>
