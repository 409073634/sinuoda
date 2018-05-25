import store from '@/store'
import api from '@/api'
import { messager } from '@/utils'

// Default buttons
const defaultButtons = [
  { id: 'btnAdd', name: '新增', icon: 'fa-plus' },
  { id: 'btnEdit', name: '编辑', icon: 'fa-pencil' },
  { id: 'btnDelete', name: '删除', icon: 'fa-trash' }
]

/**
 * Feature buttons
 * @param config
 * @returns {Array}
 */
export function getMainButtons(config) {
  let path = store.state.route ? store.state.route.path : store.state.pagePath
  if (path && !path.startsWith('/pages')) {
    path = '/pages' + path
  }
  if (path && !path.endsWith('.html')) {
    path += '.html'
  }
  return api.feature.getAuthButtons({ path }).then(data => {
    let buttons = config && config.buttons || defaultButtons
    let userBtns = typeof data === 'string' ? data.split(',') : []
    return buttons.filter(btn => userBtns.includes(btn.id))
  })
}

/**
 * Convert raw data to easyui's tree data
 * @param rawData: tree data from api
 * @param childProp: children property name in raw data
 * @param maps: name convert
 * @param cond: condition functions that return boolean value
 *              close: condition to set node state to close, default is false
 *              child: condition to set children node, default is true
 */
export function getTreeData(rawData, childProp, maps, cond) {
  cond = cond || {}
  let sortNodes = nodes => nodes.sort((a, b) => a.seq - b.seq)
  let getState = node => (typeof cond.close === 'function' && cond.close(node)) ? 'closed' : 'open'
  let setName = node => {
    let hasChildren = node[childProp] && node[childProp].length && (typeof cond.child !== 'function' || cond.child(node))
    return {
      id: node[maps.id || 'id'],
      text: node[maps.text || 'text'],
      children: hasChildren ? sortNodes(node[childProp]).map(setName) : undefined,
      checked: +node.selected,
      state: getState(node),
      attributes: node
    }
  }
  return sortNodes(rawData).map(setName)
}

export function doPromise(cond, wanted, msg) {
  if (cond) {
    return Promise.resolve(wanted)
  } else {
    messager.info('提醒', msg)
    return Promise.reject(msg)
  }
}

export default {
  getMainButtons,
  getTreeData
}
