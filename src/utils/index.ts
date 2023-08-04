type TargetContext = '_self' | '_parent' | '_blank' | '_top'

export const openWindow = (
  url: string,
  opts?: { target?: TargetContext; [key: string]: any }
) => {
  const { target = '_blank', ...others } = opts || {}
  window.open(
    url,
    target,
    Object.entries(others)
      .reduce((preValue: string[], curValue) => {
        const [key, value] = curValue
        return [...preValue, `${key}=${value}`]
      }, [])
      .join(',')
  )
}

export const regexUrl = new RegExp(
  '^(?!mailto:)(?:(?:http|https|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-?)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  'i'
)

export function randomString(size = 16) {
  const t = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789'
  const a = t.length
  let n = ''
  for (let i = 0; i < size; i += 1) n += t.charAt(Math.floor(Math.random() * a))
  return n
}

export function formatCharDate(text: string) {
  if (!text) {
    return ''
  }
  if (text.length === 8) {
    return `${text.substring(0, 4)}-${text.substring(4, 6)}-${text.substring(
      6,
      8
    )}`
  }
  if (text.length === 14) {
    return `${text.substring(0, 4)}-${text.substring(4, 6)}-${text.substring(
      6,
      8
    )} ${text.substring(8, 10)}:${text.substring(10, 12)}:${text.substring(
      12,
      14
    )}`
  }
  return ''
}

export function toChinesNum(num: number) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(num.toString())) {
    return '数据非法' // 判断数据是否大于0
  }
  if(num === 0) return '零元整'

  let unit = '千百十亿千百十万千百十元角分'
  let str = ''
  let n = `${num}00`

  const indexpoint = n.indexOf('.') // 如果是小数，截取小数点前面的位数

  if (indexpoint >= 0) {
    n = n.substring(0, indexpoint) + n.substr(indexpoint + 1, 2) // 若为小数，截取需要使用的unit单位
  }

  unit = unit.substring(unit.length - n.length) // 若为整数，截取需要使用的unit单位
  for (let i = 0; i < n.length; i += 1) {
    str += '零一二三四五六七八九'.charAt(Number(n.charAt(i))) + unit.charAt(i) // 遍历转化为大写的数字
  }

  return str
    .replace(/零(千|百|十|角)/g, '零')
    .replace(/(零)+/g, '零')
    .replace(/零(万|亿|元)/g, '$1')
    .replace(/(亿)万|壹(十)/g, '$1$2')
    .replace(/^元零?|零分/g, '')
    .replace(/元$/g, '元整') // 替换掉数字里面的零字符，得到结果
}

export function millSecondToTimeStr(time: number) {
  const minutes = Math.floor(time / 60000)
  const seconds = Math.floor((time % 60000) / 1000)

  return `${minutes}分${seconds}秒`
}

export default null
