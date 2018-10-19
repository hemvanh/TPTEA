<template>
  <q-card square class="et-login text-center">
    <q-card-media>
      <svg class="center" id="logo" viewBox="0 0 483 483" width="128px" height="128px" v-html="getLoginLogo">
      </svg>
    </q-card-media>
    <q-card-title class="text-brown-6 text-center">
      <q-icon name="security" class="q-mr-sm" /> Admin Authentication
    </q-card-title>
    <q-card-main class="q-mb-md">
      <q-input clearable v-model="username" float-label="Username" color="secondary" :error="$v.username.$error" />
      <et-validator :dirty="$v.username.$dirty" :show="!$v.username.required" msg="Username is required" />
      <q-input v-model="password" float-label="Password" color="secondary" type="password" :error="$v.password.$error" />
      <et-validator :dirty="$v.password.$dirty" :show="!$v.password.required" msg="Password is required" />
    </q-card-main>
    <q-card-actions>
      <div class="row justify-center btn-signin">
        <q-btn :loading="getIsLoading" color="secondary" label="Sign In" class="text-secondary q-ma-sm col-10" @click="login({username,password,type:'password'})">
          <q-spinner-pie slot="loading" size="25px" />
        </q-btn> 
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import logoData from '../../assets/logoData'
import etValidator from '../../components/Validator'
import {required} from 'vuelidate/lib/validators'
import Vivus from 'vivus'
import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
    etValidator,
  },
  data() {
    return {
      logo: 'Digitalizer',
      vivus: '',
      username: '',
      password: '',
    }
  },
  validations: {
    username: {
      required,
    },
    password: {
      required,
    },
  },
  mounted() {
    this.startAnimation()
  },
  computed: {
    getLoginLogo() {
      return logoData[this.logo]
    },
    ...mapGetters('admin', ['getIsLoading']),
  },
  methods: {
    ...mapActions('admin', ['loginAdmin']),
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
    login(payload) {
      this.$v.$touch()
      if (this.$v.$error) return
      this.loginAdmin(payload)
    },
  },
}
</script>
<style scoped lang="stylus">
@import '~variables'

.q-card
  width $qcardWidth
  margin auto

.q-card-media
  background url('~assets/login_banner.png') no-repeat center center
  background-size cover
  height 230px
  padding 40px 0

.center
  margin auto
  display block

@media (max-width: $breakpoint-xs)
  .et-login
    width 100%

  .q-card-actions
    height calc(100vh - 462px) !important

@media (min-width: $breakpoint-xs)
  .q-card-actions
    height 100px !important

.btn-signin
  height 60px
  width 100%  
</style>
