<template>
  <q-card class="col-6 q-pa-xs no-shadow border-cat" @click.native="openMenusListing()">
    <q-card-media overlay-position="top">
      <img :src="getImagePath(cat.img)" alt="Category Image">
      <div class="card-title text-center">{{cat.name}}</div>
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
      this.$router.push('/order/menus/' + this.cat.id)
    },
    getImagePath(imageName) {
      return `statics/${imageName}`
    },
  },
}
</script>
<style scoped lang="stylus">
.border-cat
  border-radius 8px

.card-title
  position absolute
  top 0
  right 0
  left 0
  bottom 0
  display flex
  align-items center
  justify-content center
  color #fff
</style>
