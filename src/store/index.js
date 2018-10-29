import Vue from 'vue'
import Vuex from 'vuex'

import customer from './customer'
import category from './category'
import menu from './menu'
import modifier from './modifier'
import admin from './admin'
import giftcard from './giftcard'
Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      customer,
      category,
      menu,
      modifier,
      admin,
      giftcard,
    },
  })

  return Store
}
