<template>
  <q-modal v-model="opened" :content-css="{minWidth: '48vw', minHeight: '86vh'}">
    <q-modal-layout>
      <!-- <q-scroll-observable @scroll="userHasScrolled" /> -->
      <div id="labels" class=" transbox">
        <q-btn flat icon="close" @click="basicModal = false">
          <div style="margin-left: 10px; text-transform: initial;">Bring on the fruit</div>
        </q-btn>
      </div>
      <img :src="item.img" alt="ww" style="width: 683px; height:300px">
      <q-btn flat icon="close" class="absolute-top-left" @click="opened = false" style="color: white;" />
      <div style="padding: 50px">
        <div class="q-display-1 q-mb-md">Basic Modal</div>
        <p v-for="n in 15" :key="`a-${n}`">Scroll down to close</p>
        <q-btn to="/orders" class="Order" rounded>
          <div>Order</div>
        </q-btn>
      </div>
    </q-modal-layout>
  </q-modal>
</template>
<script>
export default {
  props: {
    item: [Object],
  },
  data() {
    return {
      opened: false,
    }
  },
}
</script>
<style>
</style>
