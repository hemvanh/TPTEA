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
      default: () => 5,
    },
  },
  mounted() {
    var canvas = this.$el.querySelector('#canvas')
    QRCode.toCanvas(canvas, this.qrcode, {
      color: {
        dark: this.dark,
        light: this.light,
      },
      version: this.version,
    }).catch(err => {
      _procError(err)
    })
  },
}
</script>
<style>
