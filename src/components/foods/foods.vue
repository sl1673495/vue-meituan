<template>
  <div
    class="foods"
    ref="foods"
  >
    <div
      class="food-wrapper"
      ref="foodWrapper"
    >
      <div class="menu-placeholder">
        <scroller
          :options="{click: true}"
          class="scroller-wrap"
          id="js-scroller-wrap"
          ref="scroller"
        >
          <ul
            class="menu"
            ref="menu"
          >
            <li
              :class="{'active': index === activeMenuIndex}"
              :key="index"
              @click="selectMenu(index)"
              class="type"
              ref="menuItems"
              v-for="(food,index) in foods"
            >
              <img
                :src="food.icon"
                height="15px"
                v-if="food.icon"
                width="15px"
              />
              {{food.name}}
              <span
                class="badge"
                v-if="getBoughtNumber(index)"
              >{{getBoughtNumber(index)}}</span>
            </li>
          </ul>
        </scroller>
      </div>
      <ul
        class="food-list"
        id="foodList"
        ref="foodList"
      >
        <div
          :key="index"
          class="one-type"
          v-for="(food, index) in foods"
        >
          <h2
            class="title"
            ref="foodTypeItems"
          >{{food.name}}</h2>
          <ul>
            <li
              :key="index"
              @click="showFood(spu)"
              class="food-item"
              v-for="(spu,index) in food.spus"
            >
              <div class="icon">
                <img
                  height="100%"
                  v-lazy="spu.picture"
                  width="100%"
                />
              </div>
              <div class="content">
                <h2 class="name">{{spu.name}}</h2>
                <div class="price">
                  <span class="symbol">¥</span>
                  {{spu.min_price}}
                </div>
                <div class="control">
                  <cart-control
                    :food="spu"
                    :target="cartIcon"
                  ></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </ul>
    </div>
    <shop-cart
      :deliveryPrice="info.shipping_fee"
      :minPrice="info.min_price"
      :selectFoods="selectFoods"
      @pay="pay"
    />
    <middle-modal
      visible.sync="bulletinShow"
      width="70%"
    />
    <middle-modal
      :visible.sync="foodShow"
      width="80%"
    >
      <div class="food-detail">
        <div class="img-wrapper">
          <img :src="selectFood.picture" />
        </div>
        <div class="content">
          <h2 class="name">{{selectFood.name}}</h2>
          <div class="desc">月售{{selectFood.tread_num}}份 {{selectFood.praise_content}}</div>
          <div class="bottom">
            <div class="price">
              <span class="symbol">￥</span>
              {{selectFood.min_price}}
            </div>
            <div class="control">
              <cart-control :food="selectFood"></cart-control>
            </div>
          </div>
        </div>
      </div>
    </middle-modal>
  </div>
</template>

<script>
import { getFoods } from "@/common/api/food"
import { getStyle } from "@/common/js/dom"
import CartControl from "@/base/cart-control/cart-control"
import MiddleModal from "@/base/middle-modal/middle-modal"
import ShopCart from "@/base/shopcart/shopcart"
import Scroller from "@/base/scroller/scroller"
import { mapGetters, mapMutations } from "vuex"

const HEADER_HEIGHT = "12rem"
export default {
  created() {
    this.getFoods()
    // 美食种类dom节点的数组
    this.foodTypeElements = []
  },
  mounted() {
    this.cartIcon = document.getElementById("js-cart-icon")
  },
  data() {
    return {
      info: {},
      foods: [],
      activeMenuIndex: 0,
      refreshTag: true,
      foodShow: false,
      selectFood: {}
    }
  },
  computed: {
    selectFoods() {
      let res = []
      this.foods.forEach(food => {
        food.spus.forEach(spu => {
          if (spu.number) {
            res.push(spu)
          }
        })
      })
      return res
    },
    ...mapGetters(["shop"])
  },
  methods: {
    getFoods() {
      getFoods().then(res => {
        this.info = res.data.data.poi_info
        this.foods = res.data.data.food_spu_tags
        this.$nextTick(() => {
          this.initScroller()
          this.recordMenuItemScrollTop()
        })
      })
    },
    initScroller() {
      const { menuItems, menu, scroller } = this.$refs
      const totalHeight = menuItems.reduce((total, current) => {
        return total + getStyle(current).height
      }, 0)
      menu.style.height = `${totalHeight}px`
      scroller.refresh()
    },
    recordMenuItemScrollTop() {
      this.foodTypeElement = []
      const { foodTypeItems, menu, scroller } = this.$refs
      foodTypeItems.forEach(foodTypeItem => {
        this.foodTypeElements.push(foodTypeItem)
        const { offsetTop } = foodTypeItem
      })
    },
    selectMenu(index) {
      this.foodTypeElements[index].scrollIntoView({
        block: "center",
        behavior: "smooth"
      })
      this.activeMenuIndex = index
    },
    getBoughtNumber(index) {
      let total = 0
      this.foods[index].spus.forEach(val => {
        total += val.number || 0
      })
      return total || ""
    },
    showFood(food) {
      this.foodShow = true
      this.selectFood = food
    },
    pay() {
      const order = {
        selectFoods: this.selectFoods,
        deliveryPrice: this.info.shipping_fee,
        shop: this.shop
      }
      this.setOrder(order)
      this.$router.push("/pay")
    },
    ...mapMutations({
      setOrder: "SET_ORDER"
    })
  },
  components: {
    CartControl,
    MiddleModal,
    ShopCart,
    Scroller
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
@import '~common/stylus/mixin.styl';

.foods {
  position: relative;

  .food-wrapper {
    display: flex;
    width: 100%;

    .menu-placeholder {
      width: 7rem;
      flex-shrink: 0;
      background: $color-grey-background;
      min-height: 100vh;
    }

    .scroller-wrap {
      height: calc(100vh - 3.7rem);
      overflow: hidden;

      &.fixed {
        width: 7rem;
        top: 2.5rem;
        bottom: 0;
        position: fixed;
        z-index: 1;
      }

      .menu {
        padding-bottom: 14.5rem;

        &.fixed {
          position: fixed;
          z-index: 1;
        }
      }
    }

    .menu {
      width: 7rem;
      flex: 0 0 7rem;
      flex-shrink: 0;
      padding-bottom: 3.7rem;
      background: $color-grey-background;

      &.fixed {
        position: fixed;
        left: 0;
        top: 2.5rem;
        bottom: 0;
        z-index: 2;
      }

      .type {
        position: relative;
        height: 4rem;
        line-height: 4rem;
        text-align: center;
        font-size: 0.9rem;
        color: $color-text-dark-grey;

        &.active {
          background: #fff;
        }

        img {
          vertical-align: middle;
        }

        .badge {
          position: absolute;
          right: 0.5rem;
          top: 0.5rem;
          padding: 0.05rem 0.3rem;
          line-height: 1rem;
          color: #fff;
          font-weight: 700;
          font-size: 0.7rem;
          border-radius: 0.7rem;
          background: $color-red;
        }
      }
    }

    .food-list {
      flex: 1;
      overflow: hidden;
      padding-bottom: 3.7rem;

      .one-type {
        .title {
          height: 1.7rem;
          line-height: 1.7rem;
          text-align: center;
          color: $color-text-grey;
          font-size: $font-size-medium;
          border-left: 2px solid #d9dde1;
          background: $color-grey-background;
        }

        .food-item {
          height: 5rem;
          padding: 1rem;
          display: flex;
          border-1px($color-split-grey);

          .icon {
            flex: 0 0 6rem;
            vertical-align: top;
          }

          .content {
            flex: 1;
            display: flex;
            position: relative;
            justify-content: space-between;
            flex-direction: column;
            overflow: hidden;
            padding: 0 0.5rem;

            .name {
              font-size: $font-size-medium;
              font-weight: bold;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .price {
              font-size: $font-size-medium-x;
              font-weight: bold;
              color: $color-price;

              .symbol {
                font-size: 0.7rem;
              }
            }

            .control {
              position: absolute;
              right: 0;
              bottom: 0;
            }
          }
        }
      }
    }
  }
}

.food-detail {
  .img-wrapper {
    position: relative;
    padding-top: 100%;

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      border-radius: 1.066667vw 1.066667vw 0 0;
    }
  }

  .content {
    padding: 1rem;

    .name {
      font-weight: bold;
      font-size: $font-size-medium;
      margin-bottom: 0.5rem;
    }

    .desc {
      font-size: $font-size-small;
      color: $color-text-grey;
      margin-bottom: 2rem;
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price {
        font-size: $font-size-medium-x;
        color: $color-price;
        font-weight: bold;
      }

      .symbol {
        font-size: 0.7rem;
      }
    }
  }
}
</style>
