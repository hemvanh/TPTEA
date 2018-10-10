<template>
  <div class="row justify-center q-mt-md q-mb-md">
    <q-btn-group rounded>
      <q-btn icon="remove" text-color="brown-14" :disable="getCounter===0" @click="changeCount(false)" />
      <q-btn :label="getCounter.toString()" />
      <q-btn icon="add" text-color="brown-14" @click="changeCount(true)" />
    </q-btn-group>
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  computed: {
    ...mapGetters('menu', ['getCounter']),
  },
  methods: {
    ...mapMutations('menu', ['setCounter']),
    changeCount(type) {
      var counter = this.getCounter
      type ? counter++ : counter--
      this.setCounter(counter)
    },
  },
}
</script>
<style scoped>
</style>
