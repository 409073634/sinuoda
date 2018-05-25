import axios from 'axios'
import store from '../store'
import router from '../router'
import config from '../config'
import fileDownload from 'js-file-download'
import { messager } from '@/utils'

axios.interceptors.request.use(config => {
  if (!config.headers.token && store.state.token) {
    config.headers.token = store.state.token
  }
  return config
}, error => {
  console.error(error)
})

export const request = (method, path, params, data = null) => {
  if (!method) {
    console.error('API function call requires `method` argument')
    return
  }

  if (!path) {
    console.error('API function call requires `path` argument')
    return
  }

  if (method === 'post' && !data && typeof params === 'object') {
    data = params
    params = null
  }

  let url = config.serverURI + path
  return axios({method, url, params, data}).then((resp) => {
    if (resp.data && resp.data.code === '00') {
      return resp.data.data
    } else {
      // TODO
      messager.info('提示', resp.data.msg)
      if (resp.data.code === '100' || resp.data.code === '101') {
        store.commit('SET_LOGOUT')
      }
      return Promise.reject(resp.data)
    }
  }).catch(error => {
    // TODO
    console.log(error.response)
    if (error.response.status === 401) {
      router.push('/login')
    }
    return Promise.reject(error)
  })
}

export const createApi = (basePath, extraActions) => {
  // About action
  //   - name: method name, required
  //   - method: request method, default: 'post'
  //   - end: api end, default: same as name
  //   - path: path parameter
  //   - wrap: wrap data in object, example: wrap is 'id' -> `{ id: <data> }`
  let actions = [
    { name: 'get', path: 'id' },
    { name: 'delete', end: 'del', path: 'id' },
    { name: 'add' },
    { name: 'update' }
  ]
  // Add custom actions
  if (extraActions && extraActions.length) {
    actions = actions.concat(extraActions)
  }
  // Wrap data
  let wrapper = (wrap, data) => wrap ? {[wrap]: data} : data
  // Parse url, params & payload
  let parseData = (action, data) => {
    let _data = data
    let url = '/' + basePath + '/' + (action.end || action.name)
    let params = null
    let payload = null
    if (action.path && data[0] && typeof data[0] === 'string') {
      url += '/' + data[0]
      _data = data.slice(1)
    }
    if (_data.length > 1) {
      params = _data[0]
      payload = wrapper(action.wrap, _data[1])
      return [url, params, payload]
    } else {
      payload = wrapper(action.wrap, _data[0])
      return [url, payload]
    }
  }
  // Create an object of methods, example: `{ get: functionA, add: functionB }`
  return Object.assign(
    {},
    ...actions.map(action => (
      {
        [action.name]: (...data) => request(
          action.method || 'post',
          ...parseData(action, data)
        )
      }
    ))
  )
}

export const download = function (path, fileType, filename) {
  axios.post(config.serverURI + path, null, {
    responseType: 'arraybuffer'
  }).then(resp => {
    let blob = new Blob([resp.data], {
      type: fileType || 'application/vnd.ms-excel'
    })
    fileDownload(blob, filename || 'data.xlsx')
  })
}

export const serverURI = config.serverURI

export default {
  request,
  createApi,
  download,
  serverURI
}

