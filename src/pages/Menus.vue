<template>
  <q-page>
    <q-modal v-model="opened" maximized class="max-width-center-h">
      <q-modal-layout>
        <q-toolbar slot="header" class="q-pt-none q-pb-none" color="brown-6">
          <q-btn flat round dense icon="reply" @click="backToCategories()" />
          <q-toolbar-title>
            {{cat.name}}
          </q-toolbar-title>
        </q-toolbar>
        <q-toolbar slot="header" class="q-pt-none" color="brown-6">
          <q-search class="full-width" v-model="search" inverted color="none" />
        </q-toolbar>
        <et-menu :menus="filterMenu"></et-menu>
        <q-toolbar slot="footer" color="brown-6" class="row inline items-center">
          <q-btn label="View Carts" />
          <q-toolbar-title class="text-right">
            $0
          </q-toolbar-title>
        </q-toolbar>
      </q-modal-layout>
    </q-modal>
  </q-page>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import etMenu from 'components/Menu'
export default {
  data() {
    return {
      opened: true,
      search: '',
      cat: {},
    }
  },
  components: {
    etMenu,
  },
  computed: {
    ...mapGetters({
      getRecsCategory: 'category/getRecs',
    }),
    ...mapGetters({
      getRecsMenu: 'menu/getRecs',
    }),
    filterMenu() {
      if (this.getRecsMenu != null) {
        return this.getRecsMenu.filter(({name}) => name.match(new RegExp(this.search, 'gi')))
      }
    },
  },
  methods: {
    ...mapActions('menu', ['fetchRecs']),
    ...mapMutations('menu', ['setRecs']),
    backToCategories() {
      this.setRecs([])
      this.$router.push('/categories')
    },
  },
  mounted() {
    this.cat = this.getRecsCategory.find(item => item.id === parseInt(this.$route.params.catId))
    this.fetchRecs(this.cat)
  },
}
</script>
<style>
</style>
