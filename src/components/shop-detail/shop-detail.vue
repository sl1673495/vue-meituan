<template>
  <transition name="slide">
    <div
      class="shop-detail"
      ref="scroller"
    >
      <div
        class="header"
        id="shopHeader"
        ref="shopHeader"
      >
        <div class="background">
          <img
            :src="shop.pic_url"
            height="100%"
            width="100%"
          />
        </div>
        <div class="avatar">
          <img
            :src="shop.pic_url"
            height="100%"
            width="100%"
          />
        </div>
        <div
          class="content-wrapper"
          v-if="data.poi_info"
        >
          <div class="content">
            <h1 class="title">
              <span
                class="icon"
                v-show="shop.poi_type_icon"
              >
                <img
                  :src="shop.poi_type_icon"
                  height="15px"
                  width="30px"
                />
              </span>
              <span class="name">{{shop.name}}</span>
            </h1>
            <div class="describe">
              <span class="item">{{data.poi_info.app_delivery_tip}}</span>
              <span class="item">{{data.poi_info.delivery_time_tip}}送达</span>
              <span class="item">{{data.poi_info.min_price_tip}}</span>
            </div>
            <div class="bulletin">{{data.poi_info.bulletin}}</div>
          </div>
        </div>
        <div
          @click="back"
          class="back-icon"
        >
          <i class="icon-back"></i>
        </div>
      </div>
      <div class="tab-bar-placeholder">
        <div
          class="tab-bar"
          ref="tabBar"
        >
          <router-link
            :to="{name:'foods'}"
            class="tab-item"
          >
            <span class="text">点菜</span>
          </router-link>
          <router-link
            :to="{name:'ratings'}"
            class="tab-item"
          >
            <span class="text">评价</span>
          </router-link>
        </div>
      </div>
      <transition name="slide">
        <keep-alive>
          <router-view class="router-view-content" />
        </keep-alive>
      </transition>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex"
import { getFoods } from "@/common/api/food"
import { getStyle } from "@/common/js/dom"

const HEADER_HEIGHT = "12rem"
export default {
  computed: {
    ...mapGetters(["shop"])
  },
  created() {
    this.getData()
  },
  mounted() {
    this.handleFix([
      this.$refs.tabBar,
      document.getElementById("js-foods-menu")
    ])
  },
  data() {
    return {
      data: []
    }
  },
  methods: {
    back() {
      this.$router.push("/")
    },
    getData() {
      getFoods().then(res => {
        this.data = res.data.data
      })
    },
    handleFix(elements) {
      const { scroller, shopHeader, tabBar } = this.$refs
      const shopHeaderHeight = getStyle(shopHeader).height
      scroller.addEventListener("scroll", () => {
        const scrollerScrollTop = scroller.scrollTop
        if (scrollerScrollTop > shopHeaderHeight) {
          elements.forEach(el => {
            el.classList.add("fixed")
          })
        } else {
          elements.forEach(el => {
            el.classList.remove("fixed")
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.shop-detail {
  height: 100%;
  background: #fff;
  flex-direction: column;
  scroll(y);

  &.slide-enter-active, &.slide-leave-active {
    transition: all 0.3s;
  }

  &.slide-enter, &.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  .header {
    position: relative;
    width: 100%;
    height: 12rem;
    overflow: hidden;
    transition: all 0.3s;

    .background {
      height: 30%;
      filter: blur(10px);
    }

    .avatar {
      position: absolute;
      top: 1rem;
      left: 50%;
      transform: translateX(-50%);
      width: 5rem;
      height: 4rem;
    }

    .content-wrapper {
      padding: 2.5rem 1rem 1.5rem 2rem;
      text-align: center;

      .content {
        display: inline-block;
        vertical-align: middle;
        font-size: 0;
        margin-left: 0.5rem;

        .title {
          margin-bottom: 0.8rem;

          .icon {
            vertical-align: middle;
          }

          .name {
            font-size: 1.1rem;
            font-weight: bold;
          }
        }

        .describe {
          font-size: 0;
          margin-bottom: 0.8rem;

          .item {
            font-size: $font-size-small;
            margin-right: 0.5rem;
          }
        }

        .bulletin {
          width: 15rem;
          color: $color-text-grey;
          white-space: nowrap;
          overflow-x: hidden;
          padding: 0.1rem;
          text-overflow: ellipsis;
          margin-bottom: 0.8rem;
          font-size: $font-size-small;
        }

        .support {
          font-size: $font-size-small;
        }
      }
    }

    .back-icon {
      position: absolute;
      left: 0.5rem;
      top: 0.5rem;

      .icon-back {
        font-size: 1.4rem;
      }
    }
  }

  .notify {
    background: #FFF8E8;
    height: 2rem;
    line-height: 2rem;
    padding: 0 0.5rem;
    font-size: $font-size-small;

    img {
      vertical-align: middle;
    }
  }

  .tab-bar-placeholder {
    height: 2.5rem;
  }

  .tab-bar {
    display: flex;
    height: 2.5rem;
    line-height: 2.5rem;
    background: white;
    border-1px($color-split-grey);

    &.fixed {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      z-index: 1;
    }

    .tab-item {
      display: block;
      text-align: center;
      flex: 1;

      &.router-link-active .text {
        border-bottom: 4px solid #FFD161;
      }

      .text {
        display: inline-block;
        height: 2.2rem;
        padding: 0 0.7rem;
      }
    }
  }

  .router-view-content {
  }
}
</style>
