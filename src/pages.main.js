import Vue from 'vue'
import store from './store'

// css
import 'bootstrap/less/bootstrap.less'
import 'ionicons/scss/ionicons.scss'
import 'font-awesome/scss/font-awesome.scss'
import '@/assets/scss/common.scss'
import '@/assets/plugins/easyui/themes/insdep/easyui.css'
import '@/assets/plugins/easyui/themes/insdep/icon.css'
import '@/assets/scss/easyui-extend.scss'

// js
import 'bootstrap/dist/js/bootstrap.js'
import '@/assets/plugins/easyui/jquery.easyui.min'
import '@/assets/plugins/easyui/themes/insdep/jquery.insdep-extend.min'
import '@/assets/plugins/easyui/jquery.extend'
import '@/assets/plugins/easyui/extension'
import '@/assets/plugins/easyui/extension/datagridview/datagrid-detailview'
import 'es6-shim'
import 'classlist-polyfill'

// Check local storage to handle refreshes
if (window.localStorage) {
  let localUserString = window.localStorage.getItem('user') || 'null'
  let localUser = JSON.parse(localUserString)
  let localMenusString = window.localStorage.getItem('menus')
  let localMenus = JSON.parse(localMenusString || '[]')

  if (localUser && store.state.user !== localUser) {
    let token = window.localStorage.getItem('token')
    store.commit('SET_USER', localUser)
    store.commit('SET_TOKEN', token)
    store.commit('SET_MENUS', localMenus)
  }
}

export default {
  initApp: (AppView) => {
    let path = AppView._meta && AppView._meta.path
    path = ('' + path).startsWith('/') ? path : ('/' + path)
    store.commit('SET_PAGE_PATH', path)

    window.app = new Vue({
      el: '#root',
      store: store,
      components: {
        AppView
      },
      template: '<app-view />'
    })
  }
}
