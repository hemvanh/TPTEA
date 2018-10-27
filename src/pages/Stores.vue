<template>
<div>
  <q-btn @click="alert" icon-right="crop_free" color="teal" label="Create QR" />
  <q-input id="input" v-model="value"  />
  <qrcode-vue :value="value" :size="size" ></qrcode-vue>
</div>
</template>
<script>
import QrcodeVue from 'qrcode.vue'
export default {
  data() {
    return {
      value: '',
      size: 200,
    }
  },
  components: {
    QrcodeVue,
  },
  methods: {
    alert() {
      console.log('value')
    },
  },
}
</script>
<style>
</style>
