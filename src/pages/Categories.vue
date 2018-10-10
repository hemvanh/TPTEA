<template>
  <q-page class="row">
    <et-category v-for="(cat,index) in getRecs" :key="index" :cat="cat"></et-category>
  </q-page>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import etCategory from 'components/Category'
export default {
  name: 'Categories',
  components: {
    etCategory,
  },
  computed: {
    ...mapGetters('category', ['getRecs']),
  },
  methods: {
    ...mapActions('category', ['fetchRecs']),
  },
  mounted() {
    this.fetchRecs()
  },
}
</script>
<style scoped>
</style>
