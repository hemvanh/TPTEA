import Vue from 'vue'
import Vuex from 'vuex'
import member from './member'
import customer from './customer'
import order from './order'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      customer,
      member,
      order,
    },
  })

  return Store
}
