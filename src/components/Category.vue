<template>
  <q-card class="col-6 q-pa-xs no-shadow" style="border-radius: 8px" @click.native="openMenusListing()">
    <q-card-media overlay-position="top">
      <img :src="'statics/'+cat.img">
      <q-card-title slot="overlay" class="text-right">
        {{cat.name}}
      </q-card-title>
    </q-card-media>
  </q-card>
</template>
<script>
export default {
  props: {
    cat: [Object],
  },
  methods: {
    openMenusListing() {
      this.$router.push('/menus/' + this.cat.id)
    },
  },
}
</script>
<style scoped>
</style>
