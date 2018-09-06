<template>
  <q-modal v-model="opened" style="max-width: 700px; margin:auto">
    <q-modal-layout >
      <div>
        <q-btn flat icon="close" @click="opened = false" >
          <div class="q-ml-sm" style="text-transform: initial">{{item.title}}</div>
        </q-btn>
      </div>
      <q-carousel-slide :img-src="item.img" style="height:300px"/>
      <div style="padding: 50px">
        <div class="q-display-1 q-mb-md">{{item.titlecont}}</div>
        <p>{{item.cont}}</p>
        <q-btn  to="/orders" color="green" class="Order" rounded>
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
