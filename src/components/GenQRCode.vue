<template>
  <div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<script>
import {_procError} from '../util/common'
import QRCode from 'qrcode'
export default {
  props: {
    qrcode: {
      type: String,
      default: () => 'xxx',
    },
    dark: {
      type: String,
      default: () => '#00F',
    },
    light: {
      type: String,
      default: () => '#0000',
    },
    version: {
      type: Number,
      default: () => 6,
    },
  },
  methods: {
    drawImage(qrcode) {
      var canvas = this.$el.querySelector('#canvas')
      QRCode.toCanvas(canvas, qrcode, {
        color: {
          dark: this.dark,
          light: this.light,
        },
        version: this.version,
      }).catch(err => {
        _procError(err)
      })
    },
  },
  mounted() {
    this.drawImage(this.qrcode)
  },
  watch: {
    qrcode(newQRCode, oldQRCode) {
      this.drawImage(newQRCode)
    },
    dark(newColor, oldColor) {
      this.dark = newColor
      this.drawImage(this.qrcode)
    },
  },
}
</script>
<style>
