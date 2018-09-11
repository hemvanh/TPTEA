<template>
  <q-page class="row gutter-xs content-start et-menu-cat">
    <comp-cat v-for="(dataCat,index) in getRecsCategory" :key="index" :dataCat="dataCat"></comp-cat>
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
    ...mapGetters('category', ['getRecsCategory']),
  },
  methods: {
    ...mapActions('category', ['fetchCategory']),
  },
  mounted() {
    this.fetchCategory()
  },
}
</script>
<style scoped>
.et-menu-cat {
  padding: 0 8px 8px 0;
  max-width: 560px;
  margin: auto;
}
</style>
