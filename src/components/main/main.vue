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
    <div class="red-packet">
      <img width="100%" height="100%" src="static/meituan/red-packet.png">
    </div>
    <div class="activity">
      <div class="item">
        <h2 class="name" style="color: #e81919">
          限量抢购
        </h2>
        <p class="desc">
          超值美味 9.9元起
        </p>
        <p class="desc-2">
          <span style="color: #e81919">1398</span>人正在抢 >
        </p>
        <div class="pic">
          <img width="60%" height="100%" src="static/meituan/ac-food1.png">
        </div>
      </div>
      <div class="item">
        <h2 class="name">
          品质套餐
        </h2>
        <p class="desc">
          搭配齐全吃得好
        </p>
        <p class="desc-2">
          <span style="color: #af8260">
            立即抢购 >
          </span>
        </p>
        <div class="pic">
          <img width="60%" height="100%" src="static/meituan/ac-food2.png">
        </div>
      </div>
    </div>
    <div class="shop-list">
      <h1 class="title">
        附近商家
      </h1>
      <shop-list @select="selectShop" :data="shopList" @del="del"></shop-list>
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
  import {mapMutations} from 'vuex'
  import shopManager from '@/common/api/shop'

  const MAX_PULL_LENGTH = 100
  const LENGTH_TO_REFRESH = 50
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
      scroll(e) {
        // 下拉加载更多
        const currentHeight = window.innerHeight
        const leaveTop = document.documentElement.scrollTop || document.body.scrollTop
        if (leaveTop === 0) {
          e.preventDefault()
        }
        const bodyHeight = document.getElementsByTagName('body')[0].clientHeight
        if (currentHeight + leaveTop === bodyHeight) {
          setTimeout(() => {
            this.$http({
              method: 'get',
              url: '/static/json/shops2.json'
            }).then((res) => {
              this.shopList = this.shopList.concat(res.data.poilist)
            })
          }, 1000)
        }
      },
      getShopList() {
        shopManager.getShopList().then((res) => {
          this.shopList = res.data.poilist
        })
      },
      mainTouchStart(e) {
        this.$refs.loading.style[transition] = ``
        const leaveTop = document.documentElement.scrollTop || document.body.scrollTop
        const touch = e.touches[0]
        this.touch = {}
        if (leaveTop <= 0) {
          this.touch.initRefreshing = true
        }
        this.touch.startY = touch.pageY
        this.touch.startX = touch.pageX
        this.touch.startClientY = touch.clientY
      },
      mainTouchMove(e) {
        if (this.isRefreshing) {
          return
        }
        if (!this.touch.initRefreshing) {
          return
        }
        const touch = e.touches[0]
        const dealtX = Math.abs(this.touch.startX - touch.clientX)
        const dealtY = Math.abs(this.touch.startClientY - touch.clientY)
        // x方向偏移大于y方向 就直接返回
        if (dealtX > dealtY) {
          return
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
        } else {
          this.$refs.loading.style.height = 0
        }
      },
      mainTouchEnd(e) {
        const imageHeight = this.$refs.loading.clientHeight
        this.$refs.loading.style[transition] = `all 0.5s`
        // 拖动超过一半, 刷新
        this.isRefreshing = true
        if (imageHeight > LENGTH_TO_REFRESH) {
          this.shopList = []
          setTimeout(() => {
            this.getShopList()
            this.$refs.loading.style.height = 0
            this.isRefreshing = false
          }, 1000)
        } else {
          this.$refs.loading.style.height = 0
          this.isRefreshing = false
        }
      },
      selectShop(shop) {
        this.setShop(shop)
        this.$router.push('/detail/88')
      },
      del(index) {
        this.shopList.splice(index, 1)
      },
      ...mapMutations({
        setShop: 'SET_SHOP'
      })

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
  .red-packet
    height 6rem
    padding 0 1rem
  .activity
    display flex
    padding 0 .5rem
    margin-bottom .8rem
    .item
      width 50%
      padding 1rem 0 0 1rem
      margin-right .3rem
      background: linear-gradient(0deg,#f4f4f4 5%,#fafafa 95%);
      .name
        font-size $font-size-large
        font-weight bold
        margin-bottom .8rem
      .desc
        font-size $font-size-small
        color $color-text-dark-grey
        margin-bottom 1rem
      .desc-2, .desc-2 span
        font-weight bold
      .pic
        position relative
        height 4rem
        img
          width 8rem
          height 6rem
          position absolute
          right 0
          bottom -1rem
  .shop-list
    .title
      font-weight 700
      text-align center
      padding 2rem 0
      &:before
        display: inline-block;
        vertical-align middle
        margin-right .3rem
        content: "";
        width: 2rem;
        height: .1rem;
        background-color: #999;
      &:after
        display: inline-block;
        vertical-align middle
        margin-left .3rem
        content: "";
        width: 2rem;
        height: .1rem;
        background-color: #999;
  .load-more
    height: 100px
</style>
