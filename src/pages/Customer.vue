<template>
  <q-page>
    <div class="row items-center q-pa-xs shadow-4">
      <div class="row items-center col-10">
        <img class="icon-customer q-mr-sm shadow-1" src="statics/quasar-logo.png" width="40" height="40" />
        <span>{{getCustomer.name}}</span>
      </div>
      <div class="col-2 row items-center justify-end text-secondary">
        <span>{{getCustomer.points}}</span>
        <i class="material-icons points">stars</i>
      </div>
    </div>
    <q-list no-border class="q-mt-md q-pt-none">
      <q-item class="q-pt-md q-pb-md">
        <q-item-side icon="attach_money" />
        <q-item-main label="Balance" />
        <q-item-side right>
          <q-item-tile color="secondary">{{'$'+getCustomer.balance}}</q-item-tile>
        </q-item-side>
      </q-item>
      <q-item class="q-pt-md q-pb-md" link>
        <q-item-side icon="hourglass_empty" />
        <q-item-main label="Order History" />
        <q-item-side right icon="keyboard_arrow_right" />
      </q-item>
      <q-item class="q-pt-md q-pb-md">
        <q-item-side icon="language" />
        <q-item-main label="Language" />
        <q-item-side right>
          <q-radio v-model="language" val="en" label="EN" color="primary" />
          <q-radio v-model="language" val="cn" label="CN" color="primary" class="q-ml-sm" />
        </q-item-side>
      </q-item>
      <q-item class="q-pt-md q-pb-md">
        <q-item-side icon="notification_important" />
        <q-item-main label="Notifications" />
        <q-item-side right>
          <q-toggle v-model="notification" color="primary" />
        </q-item-side>
      </q-item>
      <q-item class="q-pt-md q-pb-md" @click.native="signOut()">
        <q-item-side icon="power_settings_new" />
        <q-item-main label="Sign Out" />
      </q-item>
    </q-list>
  </q-page>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'PageCustomer',
  data() {
    return {
      language: 'en',
      notification: true,
      customerInfo: {},
    }
  },
  computed: {
    ...mapGetters('customer', ['getCustomer']),
  },
  methods: {
    ...mapActions('customer', ['fetchCustomer']),
    signOut() {
      localStorage.removeItem('auth-token')
      this.$router.push('/')
    },
  },
  mounted() {
    this.fetchCustomer()
  },
}
</script>
<style lang="stylus" scoped>
.icon-customer
  border-radius 50%

.points
  font-size 24px
</style>
