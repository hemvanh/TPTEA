<template>
  <q-card square class="center">
    <q-card-media>
      <svg class="center" id="logo" viewBox="0 0 483 483" width="128px" height="128px" v-html="getLoginLogo">
      </svg>
    </q-card-media>
    <div class="row justify-center q-mt-lg">
      <q-btn color="facebook" class="text-white col-10" @click="registerFb()" label="REGISTER with FACEBOOK" />
    </div>
    <div class="row justify-center q-mt-md">
      <div class="col-10 row items-center text-primary">
        <hr class="q-hr col-4">
        or
        <hr class="q-hr col-4">
      </div>
    </div>

    <q-card-main class="q-mb-md q-pt-none">
      <q-input clearable v-model.trim="$v.username.$model" float-label="Username" color="secondary" :error="$v.username.$error" />
      <et-validator :dirty="$v.username.$dirty" :show="!$v.username.required" msg="Username is required" />
      <et-validator :dirty="$v.username.$dirty" :show="!$v.username.minLength" msg="Username must have at least 3 letters" />
      <et-validator :dirty="$v.username.$dirty" :show="!$v.username.alphaNum" msg="Username must be Alphanumeric only" />

      <q-input v-model="$v.password.$model" float-label="Password" color="secondary" type="password" :error="$v.password.$error" />
      <et-validator :dirty="$v.password.$dirty" :show="!$v.password.required" msg="Password is required" />
      <et-validator :dirty="$v.password.$dirty" :show="!$v.password.minLength" msg="Password must have at least 3 letters" />
      <et-validator :dirty="$v.password.$dirty" :show="!$v.password.noSpace" msg="Password must be not space" />

      <q-input v-model.trim="$v.passwordConfirm.$model" float-label="Confirm Password" color="secondary" type="password" :error="$v.passwordConfirm.$error" />
      <et-validator :dirty="$v.passwordConfirm.$dirty" :show="!$v.passwordConfirm.sameAsPassword" msg="Passwords must be identical" />

      <q-collapsible icon="people" class="text-secondary q-collapsible" label="Optional info" left>
        <q-input clearable v-model="name" float-label="Full name" class="q-mb-lg" color="secondary" />
        <q-input clearable v-model="phone" float-label="Phone" class="q-mb-lg" color="secondary" />
        <q-input clearable v-model="address" float-label="Address" class="q-mb-lg" color="secondary" />
      </q-collapsible>
    </q-card-main>
    <q-card-actions>
      <div class="row justify-center" style="height:30px;width:100%;">
        <q-btn :loading="getIsLoading" color="secondary" label="Register" class="text-secondary q-ma-sm col-10" @click="registerCustomer({username, password, passwordConfirm, name, phone, address,type:'password'})">
          <q-spinner-pie slot="loading" size="25px" />
        </q-btn>
      </div>
    </q-card-actions>
  </q-card>
</template>
<script>
import logoData from '../assets/logoData'
import etValidator from '../components/Validator'
import {required, minLength, sameAs, alphaNum} from 'vuelidate/lib/validators'
import Vivus from 'vivus'
import {mapActions, mapGetters} from 'vuex'
export default {
  components: {
    etValidator,
  },
  data() {
    return {
      logo: 'Digitalizer',
      username: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: '',
      address: '',
    }
  },
  validations: {
    username: {
      required,
      minLength: minLength(3),
      alphaNum,
    },
    password: {
      required,
      minLength: minLength(3),
      noSpace: function(value) {
        return !(value.indexOf(' ') >= 0)
      },
    },
    passwordConfirm: {
      required,
      sameAsPassword: sameAs('password'),
    },
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
    ...mapActions('customer', ['regCustomer', 'registerFb']),
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
    registerCustomer(payload) {
      this.$v.$touch()
      if (this.$v.$error) return
      this.regCustomer(payload)
    },
  },
}
</script>
<style scoped lang="stylus">
@import '~variables'

.q-card
  width $qcardWidth

.q-card-media
  background url('~assets/login_banner.png') no-repeat center center
  background-size cover
  height 230px
  padding 40px 0

.center
  margin auto
  display block

@media (max-width: $breakpoint-xs)
  .center
    width 100%

  .q-card-actions
    height calc(100vh - 527px) !important

@media (min-width: $breakpoint-xs)
  .q-card-actions
    height 240px !important

.q-collapsible
  margin-top 30px
  padding 0
</style>
