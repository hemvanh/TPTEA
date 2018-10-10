<template>
  <q-carousel class="component-top max-width-center-h news-height">
    <q-carousel-slide :img-src="item.img">
      <div class="absolute-top-left custom-caption-top">
        <div class="subtitle text-white q-ml-sm q-mt-sm">{{item.subTitle}}</div>
        <div class="q-display-1 text-white q-ml-sm q-mb-sm">{{item.title}}</div>
        <q-btn class=" fixed-bottom-left q-ml-sm q-mb-sm" @click="show" :label="item.label" :class="{ hidden: item.isBtnHidden }" color="white" text-color="brown" rounded>
        </q-btn>
        <slot></slot>
      </div>
    </q-carousel-slide>
  </q-carousel>
</template>
<script>
export default {
  props: {
    item: [Object],
  },
  methods: {
    show() {
      this.$slots.default[0].componentInstance.opened = true
    },
  },
}
</script>
<style scoped lang="stylus">
  .news-height
    height 300px
</style>
