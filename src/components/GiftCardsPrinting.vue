<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss v-model="getIsModalPrintOpened" maximized>
    <q-modal-layout>
      <q-toolbar color="primary">
        <q-btn flat icon="close" @click="isModalOpened = false"></q-btn>
        <q-btn flat icon="print" @click="print"></q-btn>
      </q-toolbar>
      <div class="giftcard-container">
        <template v-for="({code,amount,expiry},index) in getSelected">
          <gift-card :code="code" :amount="amount" :expiry="expiry" :key="index" />
          <hr :key="'spector'+index" class="hr-style" />
        </template>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
import {mapGetters} from 'vuex'
import giftCard from './GiftCard'
export default {
  components: {
    giftCard,
  },
  computed: {
    ...mapGetters('giftcard', ['getIsModalPrintOpened', 'getSelected']),
    isModalOpened: {
      get() {
        return this.$store.getters['giftcard/getIsModalOpened']
      },
      set(val) {
        this.$store.commit('giftcard/setIsModalPrintOpened', val)
      },
    },
  },
  methods: {
    print() {
      window.print()
    },
  },
}
</script>
<style lang="stylus" scoped>
.hr-style
  border-top 2px dashed #8c8b8b
  width 400px

.giftcard-container
  max-width 450px
</style>
