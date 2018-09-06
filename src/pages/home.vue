<template >
  <div>
    <news v-for="(item,index) in news" :key="`news${index}`" :item="item">
      <news-details :item="item"></news-details>
    </news>
  </div>
</template>
<script>
import news from '../components/news'
import newsDetails from '../components/newsDetails'
export default {
  name: 'PageIndex',
  components: {
    news,
    newsDetails,
  },
  data() {
    return {
      news: [
        {
          img: 'assets/component.jpg',
          label: 'Learn More',
        },
        {
          img: 'assets/component-mid.jpg',
          label: 'Learn More',
        },
      ],
    }
  },
}
</script>
<style>
</style>
