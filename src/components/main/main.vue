<template>
  <div class="main">
    <div class="loading" ref="loading">
      <img class="img" src="../../common/image/default.png" width="25px" height="25px" ref="loadingImg">
    </div>
    <div class="header" ref="header">
      <div class="search-box-wrapper">
        <search-box></search-box>
      </div>
    </div>
    <img width="100%" height="auto" src="./redcard.png">
    <div class="icon-list-wrapper">
      <icon-list :data="listData"></icon-list>
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
        <!--<div class="pic">-->
          <!--<img width="60%" height="100%" src="./food1.png">-->
        <!--</div>-->
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
        <!--<div class="pic">-->
          <!--<img width="60%" height="100%" src="static/meituan/ac-food2.png">-->
        <!--</div>-->
      </div>
    </div>
    <div class="shop-list">
      <h1 class="title">
        附近商家
      </h1>
      <shop-list @select="selectShop" :data="shopList" @del="del"></shop-list>
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
  import {path} from "common/js/config"

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
              url: path + '/static/json/shops2.json'
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
  @import "~common/stylus/variable.styl"

  .loading
    position relative
    height 100px
    margin-top -100px
    background black
    overflow: hidden
    .img
      position absolute
      top 50%
      left 50%
      border-radius 50%
      transform: translate(-50%, -50%)
 .main
   height calc(100% - 3.7rem)
   overflow scroll
   -webkit-overflow-scrolling touch
  .header
    position relative
    height 70px
    width 100%
    background-image: linear-gradient(90deg,#0af,#0085ff);
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
      padding 1rem 0 1.5rem 1rem
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
      font-size $font-size-large
      padding 1rem 0
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
