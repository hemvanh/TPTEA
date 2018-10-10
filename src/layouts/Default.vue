<template>
  <q-layout view="hhh lpr fFf">
    <q-layout-footer class="max-width-center-h">
      <q-tabs inverted position="bottom" color="brown-6" align="justify">
        <q-route-tab to="/" default name="news" slot="title" icon="stars" label="Home" />
        <q-route-tab to="/categories" name="categories" slot="title" icon="free_breakfast" label="Order" />
        <q-route-tab to="/stores" name="account" slot="title" icon="store" label="Stores" />
        <q-route-tab to="/customer" name="customer" slot="title" icon="account_box" label="Member" />
      </q-tabs>
    </q-layout-footer>
    <q-page-container class="et-home max-width-center-h">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  name: 'Default',
  data() {
    return {}
  },
  methods: {},
}
</script>
<style scoped lang="stylus">
@import '~variables'

.et-home
  overflow auto
  height calc(100vh - 65px) !important

.q-layout-page-container
  padding-bottom 0px !important
</style>
