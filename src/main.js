// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueRouterMultiView from 'vue-router-multi-view'
import VueLazyLoad from 'vue-lazyload'
import VueTouch from 'vue-touch'

import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './App.vue'

// css
import 'bootstrap/less/bootstrap.less'
import 'ionicons/scss/ionicons.scss'
import 'font-awesome/scss/font-awesome.scss'
import 'vue-image-lightbox/dist/vue-image-lightbox.min.css'
import 'admin-lte/dist/css/AdminLTE.css'
import './assets/scss/skin-skyblue.scss'
import './assets/scss/adminlte-extend.scss'
import './assets/scss/common.scss'
import './assets/plugins/easyui/themes/insdep/easyui.css'
import './assets/plugins/easyui/themes/insdep/icon.css'
import './assets/scss/easyui-extend.scss'

// js
import 'bootstrap/dist/js/bootstrap.js'
import 'admin-lte/dist/js/adminlte.js'
import './assets/plugins/easyui/jquery.easyui.min'
import './assets/plugins/easyui/themes/insdep/jquery.insdep-extend.min'
import './assets/plugins/easyui/jquery.extend'
import './assets/plugins/easyui/extension'
import './assets/plugins/easyui/extension/datagridview/datagrid-detailview'
import 'es6-shim'
import 'classlist-polyfill'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

Vue.use(VueRouter)
Vue.use(VueRouterMultiView)
Vue.use(VueLazyLoad)
Vue.use(VueTouch, {name: 'v-touch'})

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
sync(store, router)

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})
