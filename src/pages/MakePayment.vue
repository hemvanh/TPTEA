<template>
  <q-page>
    <q-modal v-model="isOpenedPayment" maximized>
      <q-btn class="absolute-top-left" color="primary" flat round dense icon="reply" @click="closePayment()"></q-btn>
      <div>
        <div class="q-title row justify-center q-mt-sm text-grey">{{getCustomer.name}}</div>
        <div class="row justify-center q-mt-sm">Give this code to the cashier for payment</div>
        <div class="q-pa-lg">
          <et-gen-q-r-code :dark='dark' :qrcode='getQRCodePayment' class="row justify-center" />
        </div>
        <span id="countdown" class="row justify-center"></span>
        <q-btn :loading="getIsLoading" class="q-mb-xl fixed-center" :disabled="disabled" color="secondary" @click="btnRefresh" label="Get New Code">
          <q-spinner-pie slot="loading" size="25px" />
        </q-btn>
      </div>
    </q-modal>
  </q-page>
</template>
<script>
import etGenQRCode from '../components/GenQRCode'
import {mapGetters, mapActions, mapMutations} from 'vuex'
const VALID_COLOR = '#00F'
const EXPIRED_COLOR = '#F00'
export default {
  data() {
    return {
      dark: VALID_COLOR,
      disabled: true,
      isOpenedPayment: true,
      countDownHandler: null,
      countDown: 0,
    }
  },
  components: {
    etGenQRCode,
  },
  computed: {
    ...mapGetters('customer', ['getCustomer', 'getQRCodePayment', 'getIsLoading']),
  },
  methods: {
    ...mapActions('customer', ['genCustomerPaymentId']),
    ...mapMutations('customer', ['setQRCodePayment']),
    closePayment() {
      this.$router.go(-1)
      clearInterval(this.countDownHandler)
    },
    btnRefresh(number) {
      this.genCustomerPaymentId()
      this.dark = VALID_COLOR
      this.disabled = true
    },
  },
  mounted() {
    this.genCustomerPaymentId()
  },
  watch: {
    getQRCodePayment(newQRCode, oldQRCode) {
      this.setQRCodePayment(newQRCode)
      var timeleft = 31
      clearInterval(this.countDownHandler)
      this.countDownHandler = setInterval(() => {
        document.getElementById('countdown').textContent =
          'This code will be expired after   ' + --timeleft + ' seconds'
        if (timeleft <= 0) {
          this.disabled = false
          this.dark = EXPIRED_COLOR
          clearInterval(this.countDownHandler)
        }
      }, 1000)
    },
  },
}
</script>
<style lang="stylus" scoped>
</style>
