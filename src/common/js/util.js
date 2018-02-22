// 保留小数
export function oneDec(number) {
  if (isNaN(number)) {
    throw new Error("请传入数字")
  }
  return Math.round(number * 100) / 100
}

export function getDateStr(timestamp) {
  var d = new Date(timestamp * 1000);
  var date = (d.getFullYear()) + "-" +
    (d.getMonth() + 1) + "-" +
    (d.getDate())
  return date
}

export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}
