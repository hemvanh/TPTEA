<template>
  <q-layout view="hhh lpr fFf">
    <q-layout-footer class="max-width-center">
      <demo-tabs v-if="$q.theme === 'ios'" />
      <q-tabs inverted position="bottom" color="brown-6" align="justify">
        <q-route-tab to="/" default name="news" slot="title" icon="stars" label="Home" class="sml-label" />
        <q-route-tab to="/orders" name="order" slot="title" icon="free_breakfast" label="Order" class="sml-label" />
        <q-route-tab to="/stores" name="account" slot="title" icon="store" label="Store" class="sml-label" />
        <q-route-tab to="/member" name="member" slot="title" icon="account_box" label="Member" class="sml-label" />
      </q-tabs>
    </q-layout-footer>
    <q-btn rounded color="green" to="/member/register" label="Join now" class="btn-reg" :class="getIsHiddenRegBtn?'hidden':''" />
    <q-page-container class="et-home max-width-center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'MyLayout',
  data() {
    return {}
  },
  computed: {
    ...mapGetters('member', ['getIsHiddenRegBtn']),
  },
  methods: {},
}
</script>
<style>
.et-home {
  overflow: auto;
  height: calc(100vh - 65px) !important;
}
.q-layout-page-container {
  padding-bottom: 0px !important;
}
.max-width-center {
  max-width: 700px;
  margin: 0 auto;
}
.btn-reg {
  text-transform: none;
  font-size: 14px !important;
  padding: 13px 25px;
  display: block;
  z-index: 9999;
  position: fixed;
  bottom: 70px;
  right: calc((100vw - 700px)/2);
}
@media only screen and (max-device-width : 700px) {
  .btn-reg{
    right:0
  }
}
</style>
