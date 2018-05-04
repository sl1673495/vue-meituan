import axios from 'axios'
import {path} from "common/js/config"

// axios.interceptors.request.use(config => {
//   // element ui Loading方法
//   console.log(config)
//   return config
// }, error => {
//   Message.error({
//     message: '加载超时'
//   })
//   return Promise.reject(error)
// })
//
// // http响应拦截器
// axios.interceptors.response.use(data => {// 响应成功关闭loading
//   if (data.status === '404') {
//     console.log('错误')
//   }
//   return data
// }, error => {
//
//     console.log(error.response)
//
//   return Promise.reject(error)
// })

export default {
  getShopList() {
    return axios({
      url: path +  '/static/json/shops.json',
      method: 'get'
    })
  }
}
