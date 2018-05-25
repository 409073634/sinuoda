export default {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_LOGOUT (state) {
    state.token = false
  },
  SET_AVATAR (state, avatar) {
    state.avatar = avatar
  },
  ADD_TAB (state, tab) {
    if (tab.fullPath === '/') {
      state.tabs.unshift(tab)
    } else {
      state.tabs.push(tab)
    }
  },
  REMOVE_TAB (state, tabName) {
    let idx = state.tabs.findIndex(tab => tab.name === tabName)
    state.tabs.splice(idx, 1)
  },
  UPDATE_TABS (state, tabs) {
    state.tabs = tabs
  },
  SET_APPMSG (state, msg) {
    state.appMsg = msg
  },
  TOGGLED_SIDEBAR (state) {
    state.sidebar.toggle += 1
  },
  SET_MENUS (state, menus) {
    state.menus = menus
  },
  SET_PAGE_PATH (state, path) {
    state.pagePath = path
  }
}
