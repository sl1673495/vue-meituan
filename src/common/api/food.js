import axios from 'axios'

export function getFoods() {
  return axios({
    url: '/static/json/foods.json',
    method: 'get'
  })
}
