<template>
  <q-card square class="et-login center">
    <q-card-media>
      <svg class="center" id="logo" viewBox="0 0 483 483"
        width="128px" height="128px" v-html="getLoginLogo">
      </svg>
    </q-card-media>
    <q-card-title class="text-brown-6">
      TP@Tea HongKong
      <div slot="right" class="row items-center">
        <q-icon name="card_membership" class="q-mr-sm" @click="alert()"/>Memberships
      </div>
    </q-card-title>
    <q-card-main class="q-mb-md">
      <q-input clearable v-model="username" float-label="Username" class="q-mb-lg" color="light-green-9"/>
      <q-input v-model="password" float-label="Password" color="red-9" type="password"/>
    </q-card-main>
    <q-card-actions>
      <div class="row justify-center" style="height:160px;width:100%;">
        <q-btn :loading="getIsLoading" color="amber-3" label="Sign In" class="text-brown-6 q-ma-sm col-10" @click="loginCustomer({username,password})">
          <q-spinner-pie slot="loading" size="25px"/>
        </q-btn>
        <q-btn color="grey-2" label="Visit Facebook" class="text-grey-8 q-ma-sm col-10"/>
        <q-btn color="grey-2" label="Visit Instagram" class="text-grey-8 q-ma-sm col-10"/>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import logoData from '../assets/logoData'
import Vivus from 'vivus'
import {mapActions, mapGetters} from 'vuex'
export default {
  data() {
    return {
      logo: 'Digitalizer',
      vivus: '',
      username: '',
      password: '',
    }
  },
  mounted() {
    this.startAnimation()
  },
  computed: {
    getLoginLogo() {
      return logoData[this.logo]
    },
    ...mapGetters('customer', ['getIsLoading']),
  },
  methods: {
    ...mapActions('customer', ['loginCustomer']),
    startAnimation() {
      this.vivus = new Vivus(
        'logo',
        {
          duration: 400,
          forceRender: false,
        },
        function(myVivus) {
          for (let item of myVivus.el.children[0].children) {
            item.setAttribute('style', 'fill:white')
          }
        }
      )
    },
  },
}
</script>
<style scoped>
.q-card {
  width: 350px;
}
.q-card-media {
  background: url('~assets/login_banner.png') no-repeat center center;
  background-size: cover;
  height: 230px;
  padding: 40px 0;
}
.center {
  margin: auto;
  display: block;
}

@media (max-width: 601px) {
  .et-login {
    width: 100%;
  }
  .q-card-actions {
    height: calc(100vh - 527px) !important;
  }
}
@media (min-width: 602px) {
  .q-card-actions {
    height: 240px !important;
  }
}
</style>
