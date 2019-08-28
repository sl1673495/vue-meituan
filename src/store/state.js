import {getOrderHistory, getShop} from "@/common/js/cache";

const state = {
  shop: getShop(),
  order: {},
  orderHistory: getOrderHistory()
}

export default state
