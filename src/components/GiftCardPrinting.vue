<template>
  <q-modal v-model="getIsModalPrintOpened">
    <h4>Basic Modal</h4>
    <q-btn color="primary" @click="opened = false" label="Close" />
  </q-modal>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters('giftcard', ['getIsModalPrintOpened']),
  },
}
</script>
