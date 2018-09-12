<template>
  <div v-if="dirty">
    <div class="et-validator-error" v-if="show">{{msg}}</div>
  </div>
</template>
<script>
export default {
  name: 'QValidator',
  props: {
    dirty: {
      default: false,
      type: Boolean,
    },
    show: {
      default: false,
      type: Boolean,
    },
    msg: {
      default: 'Input value does not match the validation',
      type: String,
    },
  },
}
</script>
<style scoped>
.et-validator-error {
  padding: 10px;
  font-size: 12px;
  font-style: italic;
  color: red;
}
</style>
