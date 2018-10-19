import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import {getUserType} from '../util/common'
Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function({store}) {
  const Router = new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE,
  })

  Router.beforeEach((to, _, next) => {
    let toPath = to.path
    switch (getUserType()) {
      case 'c': // user is CUSTOMER
        switch (toPath) {
          case '/customer':
          case '/customer/':
            next()
            break
          case '/':
          case '/customer/login':
          case '/customer/register':
            next('/customer')
            break
          default:
            next()
            break
        }
        // prevent customer user route to admin's path
        if (toPath.substr(0, 6) === '/admin') next('/customer')
        break
      case 'a': // user is ADMIN
        switch (toPath) {
          case '/admin':
          case '/admin/':
            next()
            break
          case '/':
          case '/admin/login':
          case '/categories':
            next('/admin')
            break
          default:
            next()
            break
        }
        // prevent admin user route to customer's path
        if (toPath.substr(0, 9) === '/customer') next('/admin')
        break
      default:
        // use is ANONYMOUS
        // recognize route of custmer user
        if (toPath.substr(0, 9) === '/customer') {
          switch (toPath) {
            case '/customer/register':
            case '/customer/register/':
            case '/customer/login':
            case '/categories':
              next()
              break
            default:
              next('/customer/login')
              break
          }
          // recognize route of admin user
        } else if (toPath.substr(0, 6) === '/admin') {
          switch (toPath) {
            case '/admin':
            case '/admin/':
              next('/admin/login')
              break
            case '/admin/login':
            case '/admin/login/':
              next()
              break
            default:
              next('/admin/login')
              break
          }
        } else {
          // route to common page(ex: home, categories...etc)
          next()
        }
        break
    }
  })

  return Router
}
