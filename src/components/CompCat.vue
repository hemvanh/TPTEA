<template>
  <div class="col-6">
    <q-card inline style="border-radius: 8px">
      <q-card-media overlay-position="top">
        <img :src="dataCat.img">
        <q-card-title slot="overlay">
          <div slot="subtitle" class="text-right">{{dataCat.name}}</div>
        </q-card-title>
      </q-card-media>
    </q-card>
  </div>
</template>
<script>
export default {
  props: {
    dataCat: [Object],
  },
}
</script>
<style scoped>
</style>
