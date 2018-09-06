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
      store.commit('member/setIsHiddenRegBtn', true)
      if (to.path === '/member') {
        next()
        // prevent route to register page
      } else if (to.path === '/member/register' || to.path === '/member/login') {
        next('/member')
      } else next()
    } else {
      // handle state show/hide register button
      switch (to.path) {
        case '/':
        case '/stores':
        case '/orders':
        case '/member':
        case '/member/login':
          store.commit('member/setIsHiddenRegBtn', false)
          break
        default:
          store.commit('member/setIsHiddenRegBtn', true)
          break
      }
      // handle routing part
      if (
        to.path === '/member/register' ||
        to.path === '/member/login' ||
        (to.path !== '/member/login' && to.path !== '/member') // prevent route to member page
      ) {
        next()
      } else next('/member/login')
    }
  })
  return Router
}
