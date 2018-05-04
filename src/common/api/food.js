import axios from 'axios'
import {path} from "common/js/config"

export function getFoods() {
  return axios({
    url: path + '/static/json/foods.json',
    method: 'get'
  })
}
