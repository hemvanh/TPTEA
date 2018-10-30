<template>
<div>
  <canvas id="canvas"></canvas>
</div>
</template>
<script>
import QRCode from 'qrcode'
export default {
  props: {
    qrcode: [String, Object],
    color: {
      type: Array,
      default: () => ['#000', '#0000'],
    },
    size: {
      type: Number,
      default: () => 4,
    },
  },
  mounted() {
    var canvas = this.$el.querySelector('#canvas')
    QRCode.toCanvas(
      canvas,
      this.qrcode,
      {
        color: {
          dark: this.color[0], 
          light: this.color[1],
        },
        version: this.size,
      },
      function(error) {
        if (error) alert(error)
        alert('success!')
      }
    )
  },
}
</script>
<style>
