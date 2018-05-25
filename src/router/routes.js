import DashView from '@/pages/Dash.vue'
import LoginView from '@/pages/Login.vue'
import PageView from '@/pages/Page.vue'
import NotFoundView from '@/pages/404.vue'

import TabsView from '@/components/views/TabsView.vue'

import AppRoutes from '@/app/app.routes'
import DemoRoutes from '@/demo/demo.routes'

// Routes
const routes = [
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView,
    meta: {
      tab: false
    }
  }, {
    path: '/pages/',
    component: PageView,
    children: AppRoutes.map(route => (Object.assign({
      ...route
    }, {
      name: route.name + 'Page',
      path: route.path,
      alias: route.path + '.html'
    })))
  }, {
    path: '/',
    component: DashView,
    children: [
      {
        path: '',
        component: TabsView,
        children: AppRoutes   // 如果是/ 就打开首页homeview
      }
    ]
  }, {
    path: '/demo',
    component: DashView,
    children: [
      {
        path: '',
        component: TabsView,
        children: DemoRoutes
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView,
    meta: {
      tab: false
    }
  }
]

export default routes
