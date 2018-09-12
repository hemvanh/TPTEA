<template>
  <q-list no-border separator>
    <q-item link class="q-pt-sm q-pb-sm" v-for="(menu,index) in menus" :key="index">
      <q-item-side>
        <q-item-tile avatar>
          <img :src="menu.img">
        </q-item-tile>
      </q-item-side>
      <q-item-main>
        <q-item-tile label>{{menu.name}}</q-item-tile>
        <q-item-tile sublabel>{{menu.desc}}</q-item-tile>
      </q-item-main>
      <q-item-side right>
        <div class="row items-center justify-between no-wrap">
          <q-btn size="14px" round dense color="brown" icon="add" class="q-mr-sm" />
        </div>
      </q-item-side>
    </q-item>
  </q-list>
</template>

<script>
export default {
  props: {
    menus: [Array],
  },
}
</script>
