import VueRouter from 'vue-router'
import routes from './routes'

import config from '../config'

// Routing logic
let router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  let tabs = router.app.$store.state.tabs
  if (to.meta.tab !== false && !to.fullPath.startsWith('/pages')) {
    if (!tabs.find(tab => tab.path === to.path)) {
      console.log(to.path, 'is tab')
      router.app.$store.commit('ADD_TAB', {
        ...to,
        title: to.meta.title || to.name
      })
    }
    // if (tabs.length === 1 && to.path !== '/') {
    //   next({ path: '/' })
    //   return
    // }
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (router.app.$store.state.token ||
      (window.localStorage && window.localStorage.getItem('token'))) {
      if (to.meta.adminOnly) {
        let user = router.app.$store.state.user
        if (user && user.isAdmin) {
          next()
        } else {
          next({
            path: config['defaultPath'] || '/'
          })
        }
      } else {
        next()
      }
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
