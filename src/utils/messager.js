import $ from 'jquery'
import { messageConfig } from '@/config'

export default {
  confirm (title, msg) {
    return new Promise((resolve, reject) => {
      if (!title || !msg) {
        reject('标题和信息不能为空！')
      }
      $.messager.confirm(title, msg, r => {
        if (r) {
          resolve(r)
        }
      })
    })
  },

  info (title, msg, timeout) {
    if (typeof msg === 'number' && !timeout) {
      timeout = msg
      msg = null
    }
    if (!msg) {
      msg = messageConfig.info[title] || title
      title = '提醒'
    }
    $.messager.info(title, msg, timeout || 2000)
  }
}
