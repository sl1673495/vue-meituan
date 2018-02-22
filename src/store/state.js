import {getOrderHistory} from "@/common/js/cache";

const state = {
  shop: {},
  order: {},
  orderHistory: getOrderHistory()
}

export default state
