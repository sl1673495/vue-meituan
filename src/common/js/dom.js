export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }

  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform',
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export function getStyle(el) {
  const styles = getComputedStyle(el)
  const replacePx = val => val.replace('px', '')
  const handleAttr = val => Number(replacePx(val))
  return {
    height: handleAttr(styles.height),
    width: handleAttr(styles.width),
  }
}

export const ballToElement = (e, targetEl, option = {}) => {
  return new Promise(resolve => {
    const initOptions = {
      ballWidth: 20,
      ballColor: '#ffd161',
      timingFunction: 'left .5s linear, top .5s cubic-bezier(0.82,0,1,1)',
      ...option,
    }
    const { ballWidth, ballColor, timingFunction } = initOptions
    // 获取初始位置
    const [x, y] = [e.clientX, e.clientY]
    // 获取终点位置
    const finalPos = targetEl.getBoundingClientRect()
    const [finalX, finalY] = [finalPos.left, finalPos.top]
    const [targetWidth, targetHeight] = [finalPos.width, finalPos.height]
    const ball = document.createElement('div')
    document.body.appendChild(ball)
    ball.style.cssText =
      'position: fixed;' +
      `left: ${x - ballWidth / 2}px;` +
      `top: ${y - ballWidth / 2}px;` +
      `width: ${ballWidth}px; ` +
      `height: ${ballWidth}px; ` +
      `background: ${ballColor};` +
      'z-index: 2; ' +
      'border-radius: 50%;' +
      `transition: ${timingFunction};`
    ball.addEventListener('transitionend', function() {
      this.remove()
      resolve()
    })
    setTimeout(() => {
      ball.style.top = `${finalY - ballWidth / 2 + targetHeight / 2}px`
      ball.style.left = `${finalX - ballWidth / 2 + targetWidth / 2}px`
    }, 0)
  })
}
