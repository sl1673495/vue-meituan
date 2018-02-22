import * as types from './mutation-types'

const matutaions = {
  [types.SET_SHOP](state, shop) {
    state.shop = shop
  },
  [types.SET_ORDER](state,order) {
    state.order = order
  },
  [types.SET_ORDER_HISTORY] (state,orderHistory) {
    state.orderHistory = orderHistory
  }
}

export default matutaions
