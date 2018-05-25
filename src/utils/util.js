/**
 * 手机号码验证
 * @param num
 * @returns {boolean}
 */
export function checkMobile (num) {
  if (!(/^1[3|4|5|8]\d{9}$/.test(num))) {
    return false
  } else {
    return true
  }
}

/**
 * 固定号码验证
 * @param num
 * @returns {boolean}
 */
export function checkPhone(num) {
  if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(num)) {
    return false
  } else {
    return true
  }
}

/**
 * 邮箱验证
 * @param val
 * @returns {boolean}
 */
export function checkEmail(val) {
  if (!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(val)) {
    return false
  } else {
    return true
  }
}

/**
 * ip地址验证
 * @param val
 * @returns {boolean}
 */
export function checkIp(val) {
  if (!/^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.) {3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/.test(val)) {
    return false
  } else {
    return true
  }
}

/**
 * 网址验证
 * @param val
 * @returns {boolean}
 */
export function checkWebUrl(val) {
  if (!/^((http(s)?:\/\/))[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]$/.test(val)) {
    return false
  } else {
    return true
  }
}

/**
 * 数组去重
 * @param array
 * @returns {Array}
 */
export function delSameArray(array) {
  var n = []
  for (var i = 0; i < array.length; i++) {
    if (n.indexOf(array[i]) === -1) n.push(array[i])
  }
  return n
}

/**
 *
 * @param date  ← let date = new date()对象
 * @param fmt   ← "yyyy-MM-dd hh:mm"
 * @return "2018-03-03 13:55"
 */
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

/**
 * 深度拷贝 将对象1拷贝给对象2
 * @param p 对象1
 * @param c 对象2
 * @return  对象2
 */
export function deepCopy(p, c) {
  c = c || {}
  for (var i in p) {
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {}
      deepCopy(p[i], c[i])
    } else {
      c[i] = p[i]
    }
  }
  return c
}

/**
 * 随机字符串
 * @param len 长度
 * @param prefix 前缀
 */
export function randomString (len, prefix) {
  let str = prefix || ''
  let availableChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_1234567890'
  for (let i = 0; i < len; i++) {
    str += availableChars.charAt(Math.floor(Math.random() * availableChars.length))
  }
  return str
}

