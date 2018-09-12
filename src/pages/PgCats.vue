<template>
  <q-page class="row">
    <comp-cat v-for="(cat,index) in getRecs" :key="index" :cat="cat"></comp-cat>
  </q-page>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
import compCat from 'components/CompCat'
export default {
  name: 'PgCats',
  components: {
    compCat,
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
