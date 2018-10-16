<template>
  <div>
    <h4 class="q-ma-xl">Welcome {{getAdmin.username}} to TP-TEA Admin Page</h4>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'PageAdmin',
  computed: {
    ...mapGetters('admin', ['getAdmin']),
  },
  methods: {
    ...mapActions('admin', ['fetchAdmin']),
  },
  mounted() {
    this.fetchAdmin()
  },
}
</script>
