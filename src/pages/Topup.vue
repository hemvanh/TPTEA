<template>
  <q-card square class="center">
    <q-card-media></q-card-media>
    <q-item class="q-pt-md q-pb-md col-11">
      <q-item-side icon="attach_money" />
      <q-item-main label="Balance Amout" />
      <q-item-side right>
        <q-item-tile color="secondary">$ {{getCustomer.balance}}</q-item-tile>
      </q-item-side>
    </q-item>
    <div class="row justify-center">
      <q-input v-model="giftCardCode" placeholder="Type gift card code" @focus="clearGiftCardCode()" :class=classGiftCardCode inverted :color="colorGiftCardCode" />
    </div>
    <div class="row justify-center">
      <div class="col-10 row items-center text-primary">
        <hr class="q-hr col-4">
        or
        <hr class="q-hr col-4">
      </div>
    </div>
    <div class="row justify-center">
      <q-btn color="secondary" label="Scan QR Code" icon="center_focus_strong" class="q-ma-sm col-11" @click="openScanner()"></q-btn>
    </div>
    <div class="row justify-center q-mt-lg">
      <q-btn :disable="!haveGiftCardCode" color="secondary" label="Apply" icon="save_alt" class="q-ma-sm col-11" @click="applyGiftCard()"></q-btn>
    </div>
    <q-modal v-model="scannerStarted" maximized>
      <q-modal-layout>
        <div>
          <q-btn class="modal-title" flat icon="close" @click="closeScanner()"></q-btn>
        </div>
        <div>
          <component @scanned="receiveScannerCode" ref="scanner" v-bind:is="theScanner"></component>
        </div>
      </q-modal-layout>
    </q-modal>
  </q-card>
</template>
<script>
import QRCodeScanner from '../components/qrcode/QRCodeScanner'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'PageTopup',
  components: {QRCodeScanner},
  data() {
    return {
      giftCardCode: '',

      scannerStarted: false,
      theScanner: null,
    }
  },
  computed: {
    ...mapGetters('customer', ['getCustomer']),
    haveGiftCardCode() {
      return this.giftCardCode !== ''
    },
    colorGiftCardCode() {
      return this.giftCardCode === '' ? 'tertiary' : 'tertiarylight'
    },
    classGiftCardCode() {
      return this.giftCardCode === '' ? 'q-ma-sm col-11' : 'q-ma-sm col-11 text-secondary'
    },
  },
  methods: {
    ...mapActions('giftcard', ['updateGiftCard']),
    clearGiftCardCode() {
      this.giftCardCode = ''
    },
    setGiftCardCode(code) {
      setTimeout(() => {
        this.giftCardCode = code
      }, 250)
    },
    receiveScannerCode(code) {
      this.setGiftCardCode(code)
      this.closeScanner()
    },
    closeScanner() {
      this.scannerStarted = false
      this.theScanner = null
    },
    openScanner() {
      this.clearGiftCardCode()
      this.scannerStarted = true
      this.theScanner = QRCodeScanner
    },
    applyGiftCard() {
      if (this.haveGiftCardCode) {
        this.updateGiftCard(this.giftCardCode)
      }
    },
  },
}
</script>
<style scoped lang="stylus">
@import '~variables'

.q-card
  width $qcardWidth
  height 100%

.q-card-media
  background url('~assets/login_banner.png') no-repeat center center
  background-size cover
  height 150px
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

.bg-tertiarylight
  background-color lighten($tertiary, 50%)

.text-secondary
  color $primary !important
</style>
