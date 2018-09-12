<template>
  <q-page>
    <q-modal v-model="opened" maximized>
      <q-modal-layout>
        <q-toolbar slot="header" class="q-pt-none q-pb-none" color="brown-6">
          <q-btn flat round dense icon="reply" @click="backToCats()" />
          <q-toolbar-title>
            {{cat.name}}
          </q-toolbar-title>
        </q-toolbar>
        <q-toolbar slot="header" class="q-pt-none" color="brown-6">
          <q-search class="full-width" v-model="search" inverted color="none" />
        </q-toolbar>
        <comp-menu :menus="filterMenu"></comp-menu>
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
import CompMenu from 'components/CompMenu'
export default {
  data() {
    return {
      opened: true,
      search: '',
      cat: {},
    }
  },
  components: {
    CompMenu,
  },
  computed: {
    ...mapGetters({
      getRecsCategory: 'category/getRecs',
    }),
    ...mapGetters('menu', ['getRecsMenu']),
    filterMenu() {
      if (this.getRecsMenu != null) {
        return this.getRecsMenu.filter(({name}) => name.match(new RegExp(this.search, 'gi')))
      }
    },
  },
  methods: {
    ...mapActions('menu', ['fetchMenus']),
    ...mapMutations({
      setRecsMenu(dispatch, payload) {
        return dispatch('menu/setRecsMenu', payload)
      },
    }),
    backToCats() {
      this.setRecsMenu([])
      this.$router.push('/categories')
    },
  },
  mounted() {
    this.cat = this.getRecsCategory.find(item => item.id === parseInt(this.$route.params.catId))
    this.fetchMenus(this.cat)
  },
}
</script>
