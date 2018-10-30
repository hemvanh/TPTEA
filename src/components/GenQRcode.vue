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
    qrcode: [String, Object],
    dark: {
      type: String,
      default: () => '#00F',
    },
    light: {
      type: String,
      default: () => '#0000',
    },
    size: {
      type: Number,
      default: () => 4,
    },
  },
  mounted() {
    var canvas = this.$el.querySelector('#canvas')
    QRCode.toCanvas(canvas, this.qrcode, {
      color: {
        dark: this.dark,
        light: this.light,
      },
      version: this.size,
    }).catch(err => {
      _procError(err)
    })
  },
}
</script>
<style>
