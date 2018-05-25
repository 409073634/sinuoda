import { request, serverURI } from './common'

import sys from './sys'
import basic from './basic'

export default {
  server: process.server || serverURI,

  user: {
    login(username, password) {
      let query = `?credential=${username}&password=${password}`
      return request('post', '/Auth/Login' + query)
    }
  },

  ...sys,

  ...basic
}
