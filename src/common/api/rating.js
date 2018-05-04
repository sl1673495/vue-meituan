import axios from 'axios'
import {path} from "common/js/config"

export function getRatings(page) {
  return axios({
    url: path + '/static/json/rating' + page +'.json',
    method: 'get'
  })
}
