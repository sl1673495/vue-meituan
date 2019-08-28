import storage from 'good-storage'

const ORDER_HISTORY_KEY = '__orderHistory__'
const SHOP_KEY = '__shop__'

export function saveOrderHistory(order) {
  let history = storage.get(ORDER_HISTORY_KEY, [])
  history.unshift(order)
  storage.set(ORDER_HISTORY_KEY, history)
  return history
}

export function getOrderHistory() {
  return storage.get(ORDER_HISTORY_KEY, [])
}

export function saveShop(shop) {
  storage.set(SHOP_KEY, shop)
}

export function getShop() {
  return storage.get(SHOP_KEY, {})
}
