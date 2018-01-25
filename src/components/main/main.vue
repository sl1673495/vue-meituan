<template>
  <div class="main"
       @touchstart="mainTouchStart"
       @touchmove="mainTouchMove"
       @touchend="mainTouchEnd"
  >
    <div class="loading" ref="loading">
      <img class="img" src="../../common/image/default.png" width="25px" height="25px" ref="loadingImg">
    </div>
    <div class="header" ref="header">
      <div class="search-box-wrapper">
        <search-box></search-box>
      </div>
    </div>
    <div class="icon-list-wrapper">
      <icon-list :data="listData"></icon-list>
    </div>
    <split></split>
    <div class="shop-list">
      <h1 class="title">
        附近商家
      </h1>
      <shop-list :data="shopList" @del="del"></shop-list>
    </div>
    <div class="load-more">
      <loading></loading>
    </div>
  </div>
</template>

<script>
  import SearchBox from '@/base/search-box/search-box'
  import IconList from '@/base/icon-list/icon-list'
  import ShopList from '@/base/shop-list/shop-list'
  import Split from '@/base/split/split'
  import Loading from '@/base/loading/loading'
  import {prefixStyle} from '@/common/js/dom'
  const MAX_PULL_LENGTH = 200
  const LENGTH_TO_REFRESH = 100
  const MIN_HEADER_HEIGHT = 50
  const ORIGIN_HEDEAR_HEIGHT = 70
  const transform = prefixStyle('transform')
  const transition = prefixStyle('transition')
  export default {
    created() {
      this.getShopList()
    },
    mounted() {
      window.addEventListener('scroll', this.scroll)
    },
    methods: {
      scroll() {
        // 下拉加载更多
        const currentHeight = window.innerHeight
        const leaveTop = document.documentElement.scrollTop || document.body.scrollTop
        if (currentHeight + leaveTop === this.touch.bodyHeight) {
          setTimeout(() => {
            this.$http({
              method: 'get',
              url: '/static/json/shops2.json'
            }).then((res) => {
              this.shopList = this.shopList.concat(res.data.poilist)
            })
          },1000)
        }
        // 下拉透明
        const percent = Math.max(0.2, 1 - leaveTop / ORIGIN_HEDEAR_HEIGHT)
        this.$refs.header.style.background = `rgba(217,63,48,${percent})`
        const newHeight = Math.max(MIN_HEADER_HEIGHT, (percent * ORIGIN_HEDEAR_HEIGHT))
        this.$refs.header.style.height = newHeight + 'px'
      },
      getShopList() {
        this.$http({
          method: 'get',
          url: '/static/json/shops.json'
        }).then((res) => {
          this.shopList = res.data.poilist
        })
      },
      mainTouchStart(e) {
        this.$refs.loading.style[transition] = ``
        const touch = e.touches[0]
        this.touch = {}
        this.touch.bodyHeight = document.getElementsByTagName('body')[0].clientHeight
        this.touch.startY = touch.pageY
        this.touch.startX = touch.pageX
      },
      mainTouchMove(e) {
        const leaveTop = document.documentElement.scrollTop || document.body.scrollTop
        const touch = e.touches[0]
        const height = window.innerHeight
        if (leaveTop === 0 && touch.pageY > this.touch.startY) {
          event.preventDefault()
        }
        // 上拉刷新
        if (touch.pageY > this.touch.startY) {
          const dealt = Math.min(touch.pageY - this.touch.startY, MAX_PULL_LENGTH)
          this.$refs.loading.style.height = `${dealt}px`
          this.$refs.loadingImg.style.height = `${dealt / 2}px`
          this.$refs.loadingImg.style.width = `${dealt / 2}px`
          if (dealt < MAX_PULL_LENGTH) {
            this.touch.percent = 2 * (1 + (touch.pageY - this.touch.startY) / MAX_PULL_LENGTH)
          }
        }else {
          this.$refs.loading.style.height = 0
        }
      },
      mainTouchEnd(e) {
        const imageHeight = this.$refs.loading.clientHeight
        this.$refs.loading.style[transition] = `all 0.5s`
        // 拖动超过一半, 刷新
        if (imageHeight > LENGTH_TO_REFRESH) {
          setTimeout(() => {
            this.$refs.loading.style.height = 0
          }, 1000)
        } else {
          this.$refs.loading.style.height = 0
        }
        this.touch.init = false
      },
      del(index){
        this.shopList.splice(index,1)
      }
    },

    data() {
      return {
        listData: [
          {
            icon: 'static/meituan/meishi.png',
            text: '美食'
          },
          {
            icon: 'static/meituan/chaoshi.png',
            text: '超市'
          }, {
            icon: 'static/meituan/guoshu.png',
            text: '生鲜果蔬'
          },
          {
            icon: 'static/meituan/yinpin.png',
            text: '甜点饮品'
          },
          {
            icon: 'static/meituan/zhuansong.png',
            text: '专送'
          },
          {
            icon: 'static/meituan/zhengcan.png',
            text: '正餐优选'
          },
          {
            icon: 'static/meituan/zaocan.png',
            text: '快餐小吃'
          },
          {
            icon: 'static/meituan/hanbao.png',
            text: '汉堡披萨'
          }
        ],
        shopList: []
      }
    },
    components: {
      SearchBox,
      IconList,
      Split,
      ShopList,
      Loading
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/variable.styl"

  .loading
    position relative
    height 0
    background black
    overflow: hidden
    .img
      position absolute
      top 50%
      left 50%
      border-radius 50%
      transform: translate(-50%, -50%)

  .header
    position relative
    height 70px
    width 100%
    background $color-background
    .search-box-wrapper
      position absolute
      width 80%
      top 50%
      left 50%
      transform: translate(-50%, -50%)

  .icon-list-wrapper
    padding 5px 0

  .shop-list
    .title
      font-weight 700
      text-align center
      padding 10px 0
  .load-more
    height: 100px
</style>
