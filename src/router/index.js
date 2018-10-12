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
    let userType = getUserType()
    // user is CUSTOMER
    if (userType === 'c') {
      if (to.path === '/customer') {
        next()
        // prevent route to register page
      } else if (to.path === '/customer/register' || to.path === '/customer/login' || to.path.indexOf('admin') > 0) {
        next('/customer')
      } else {
        next()
      }
      // user is ADMIN
    } else if (userType === 'a') {
      // route to admin home page
      if (to.path === '/admin/login') {
        next('/admin')
      } else {
        next()
      }

      // user is ANONYMOUS
    } else {
      // recognize page of user by path to route
      if (to.path === '/customer' || to.path === '/customer/') {
        // route to CUSTOMER login page
        if (
          to.path === '/customer/register' ||
          to.path === '/customer/login' ||
          (to.path !== '/customer/login' && to.path !== '/customer/' && to.path !== '/customer') // prevent route to customer page
        ) {
          next()
        } else {
          next('/customer/login')
        }
      } else if (to.path === '/admin' || to.path === '/admin/') {
        // route to ADMIN login page
        if (to.path === '/admin/login') {
          next()
        } else {
          next('/admin/login')
        }
      } else {
        next()
      }
    }
  })

  return Router
}
