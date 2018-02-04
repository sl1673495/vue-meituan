// 保留小数
export function oneDec(number) {
  if (isNaN(number)) {
    throw new Error("请传入数字")
  }
  return Math.round(number * 100) / 100
}
