<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss v-model="getIsModalPrintOpened" maximized>
    <q-modal-layout>
      <q-toolbar color="primary">
        <q-btn flat icon="close" @click="isModalOpened = false"></q-btn>
        <q-btn flat icon="print" @click="print"></q-btn>
      </q-toolbar>
      <div>
        <gift-card v-for="(giftcard,index) in getSelected" :key="index" />
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
.test {
  max-width: 900px;
}
</style>
