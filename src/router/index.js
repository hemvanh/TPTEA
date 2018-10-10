import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import {isAuth} from '../util/common'
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
    // routing page by authenticate token
    if (isAuth()) {
      if (to.path === '/customer') {
        next()
        // prevent route to register page
      } else if (to.path === '/customer/register' || to.path === '/customer/login') {
        next('/customer')
      } else next()
    } else {
      // handle routing part
      if (
        to.path === '/customer/register' ||
        to.path === '/customer/login' ||
        (to.path !== '/customer/login' && to.path !== '/customer') // prevent route to customer page
      ) {
        next()
      } else next('/customer/login')
    }
  })

  return Router
}
