import storage from 'good-storage'

const ORDER_HISTORY_KEY = '__orderHistory__'

export function saveOrderHistory(order) {
  let history = storage.get(ORDER_HISTORY_KEY, [])
  history.unshift(order)
  storage.set(ORDER_HISTORY_KEY, history)
  return history
}

export function getOrderHistory() {
  return storage.get(ORDER_HISTORY_KEY, [])
}
