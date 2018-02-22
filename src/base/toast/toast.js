import Vue from 'Vue'
import ToastVue from './toast.vue'

const ToastConstructor = Vue.extend(ToastVue)

let toastPool = []
let timer

let getAnInstance = () => {
  return new ToastConstructor({
    el: document.createElement('div')
  })
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target);
  }
};

ToastConstructor.prototype.close = function() {
  this.visible = false;
  toastPool.splice(0, 1)
  this.$el.addEventListener('transitionend', removeDom);
};

let Toast = (options = {}) => {
  let duration = options.duration || 2000
  let instance
  if (!toastPool.length) {
    instance = getAnInstance({
      el: document.createElement('div')
    })
    toastPool.push(instance)
  } else {
    instance = toastPool[0]
  }
  instance.text = typeof options === 'string' ? options : options.text
  document.body.appendChild(instance.$el)
  instance.visible = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    instance.close()
  }, duration)
  return instance
}

export default Toast
