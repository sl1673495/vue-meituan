<template>
  <ul class="icon-list">
    <li class="item" v-for="item in data">
      <div class="img">
        <img width="100%" height="100%" :src="item.icon">
      </div>
      <div class="text">
        {{item.text}}
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    created() {

    },
    methods: {},
    data() {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  .icon-list
    display flex
    flex-wrap wrap
    .item
      display flex
      box-sizing border-box
      flex-direction column
      justify-content center
      align-items center
      flex 1
      width 25%
      min-width: 25%;
      max-width: 25%;
      padding 10px
      .img
        width 50px
        height 50px
        padding-bottom 10px
      .text
        text-align center
</style>
