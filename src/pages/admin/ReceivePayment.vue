<template>
  <div class="q-pt-md row justify-center receive-payment">
    <q-field icon="attach_money" error-label="Some error" :label-width="4">
      <q-input type="number" color="secondary" placeholder="Amount" v-model="amount" />
    </q-field>
    <q-btn label="Receive Payment" :disable="getIsDisable" icon="payment" color="secondary" @click="openScaner()" />
    <q-modal v-model="getIsDialogOpenned" no-backdrop-dismiss no-esc-dismiss minimized :content-css="{maxWidth: '290px',minWidth:'230px'} ">
      <q-modal-layout class=" q-pt-md q-pr-md q-pl-md q-pb-md">
        <div class="row justify-center">
          <div class="title-receive q-pb-md">Receive Payment Info</div>
          <div class="receive-content">
            <q-field icon="account_circle" class="row inline" :label="`User Name: ${getReceived.username}`" :label-width="12" />
            <q-field icon="payment" class="row inline" :label="`Charged Amount: $${getReceived.chargedAmount}`" :label-width="12" />
            <q-field icon="account_balance_wallet" class="row inline" :label="`Balance: $${getReceived.balance}`" :label-width="12" />
          </div>
          <q-btn class="q-mt-sm row col-4" color="secondary" label="OK" @click="closeDialog()" />
        </div>
      </q-modal-layout>
    </q-modal>
    <q-modal v-model="scannerStarted" maximized>
      <q-modal-layout>
        <div>
          <q-btn class="modal-title" flat icon="close"></q-btn>
        </div>
        <div>
          <component @scanned="receiveScannerCode" ref="scanner" v-bind:is="theScanner"></component>
        </div>
      </q-modal-layout>
    </q-modal>
  </div>
</template>
<script>
import QRCodeScanner from '../../components/qrcode/QRCodeScanner'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  data() {
    return {
      isTopupOpened: true,
      scannerStarted: false,
      theScanner: null,
      amount: '',
    }
  },
  components: {QRCodeScanner},
  computed: {
    ...mapGetters('admin', ['getIsDialogOpenned', 'getReceived', 'getIsDisable']),
  },
  methods: {
    ...mapActions('admin', ['receivePayment', 'setIsOpenDialog']),
    ...mapMutations('admin', ['setIsOpenDialog']),
    receiveScannerCode(jwtPayment) {
      this.closeScanner()
      this.receivePayment({amount: this.amount, jwtPayment})
    },
    closeScanner() {
      this.scannerStarted = false
      this.theScanner = null
    },
    openScaner() {
      this.scannerStarted = true
      this.theScanner = QRCodeScanner
    },
    closeDialog() {
      this.setIsOpenDialog(false)
      this.amount = ''
    },
  },
}
</script>
<style lang="stylus" scoped>
.receive-payment
  max-width 350px
  margin auto

.title-receive
  font-size 24px

.receive-content
  max-width 213px
</style>
