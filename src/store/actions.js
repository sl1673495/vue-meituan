import {saveOrderHistory} from "@/common/js/cache";
import * as types from './mutation-types'

export const saveOrder = function({commit}, order) {
  commit(types.SET_ORDER_HISTORY,saveOrderHistory(order))
}
