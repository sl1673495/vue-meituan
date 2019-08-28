import axios from 'axios'
import {path} from "common/js/config"
import foods from '@/mock/foods'

export function getFoods() {
  return Promise.resolve({
    data: foods
  })
}
