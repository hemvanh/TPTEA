<template>
  <q-layout view="hHh Lpr fFf">
    <q-layout-header>
      <q-toolbar color="primary" :inverted="$q.theme === 'ios'">
        <q-btn dense @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          TP-TEA
        </q-toolbar-title>
        <q-btn dense round @click="logout" aria-label="Menu">
          <q-icon name="power_off" />
        </q-btn>
      </q-toolbar>
    </q-layout-header>
    <q-layout-footer>
      <div class="text-white et-footer text-weight-light text-center bg-grey-8">
        <small>
          <cite>© Copyright 2018 Elitetech Vietnam Co., Ltd. All rights reserved.</cite>
        </small>
      </div>
    </q-layout-footer>

    <q-layout-drawer v-model="leftDrawerOpen" :content-class="$q.theme === 'mat' ? 'neutral' : null">
      <q-list no-border link inset-delimiter>
        <q-item to="/admin/giftcards">
          <q-item-side icon="store" />
          <q-item-main label="Gift Cards" />
        </q-item>
        <q-item to="/admin/customers">
          <q-item-side icon="people" />
          <q-item-main label="Customers" />
        </q-item>
        <q-item to="/admin/receivepayment">
          <q-item-side icon="payment" />
          <q-item-main label="Receive Payment" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data() {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('auth-token')
      this.$router.push('/admin/login')
    },
  },
}
</script>

<style>
.et-footer {
  font-size: 0.8em;
}
</style>
