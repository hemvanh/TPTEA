<template>
  <div>
    <et-grid type="giftcard" :disableEditting="true" :expandedCol="expandedCol" supportGiftCardsPrinting />
    <modal-create-gift-card />
    <modal-q-r-code :qrcode="getCurrentGenGiftCardCode" />
    <gift-card-printing />
  </div>
</template>
<script>
import modalCreateGiftCard from '../../components/CreateGiftCardModal'
import modalQRCode from '../../components/QRCodeModal'
import etGrid from '../../components/EtGrid'
import giftCardPrinting from '../../components/GiftCardsPrinting'
import {mapGetters, mapMutations} from 'vuex'
export default {
  components: {
    etGrid,
    modalQRCode,
    modalCreateGiftCard,
    giftCardPrinting,
  },
  computed: {
    ...mapGetters('giftcard', ['getCurrentGenGiftCardCode', 'getIsModalQRCodeOpened']),
  },
  methods: {
    ...mapMutations('giftcard', ['setCurrentGenGiftCardCode', 'setIsModalQRCodeOpened']),
  },
  data() {
    let me = this
    return {
      expandedCol: {
        fieldName: 'qrcode',
        hidden: false,
        icon: 'crop_free',
        action: function(payload) {
          me.setIsModalQRCodeOpened(true)
          me.setCurrentGenGiftCardCode(payload.code)
        },
      },
    }
  },
}
</script>
<style lang="stylus" scoped>
</style>
