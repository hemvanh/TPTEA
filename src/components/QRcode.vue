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
  },
  mounted() {
    var canvas = this.$el.querySelector('#canvas')
    QRCode.toCanvas(canvas, this.qrcode, function(error) {
      if (error) console.error(error)
      console.log('success!')
    })
  },
}
</script>
<style>
