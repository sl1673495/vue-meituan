import axios from 'axios'

export function getRatings(page) {
  return axios({
    url: '/static/json/rating' + page +'.json',
    method: 'get'
  })
}
