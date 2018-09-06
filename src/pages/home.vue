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
          isBtnHidden: false,
          title: 'Bring on the fruit',
          titlecont: 'Top choice for tea to-go',
          sub: `What's New`,
          cont: `TP TEA has cultivated the various segments of the Taiwanese market,
           from cities to suburbs, from the main island to outlying islands and from major
            public transportation hubs to department stores. 
           Each store maintains the highest standard in its offerings.
            In 2016, TP TEA became the top choice for tea drinks with more than 260 stores in Taiwan.`,
        },
        {
          img: 'assets/component-mid.jpg',
          label: 'Discover Coffee',
          title: 'Find a new favorite',
          isBtnHidden: false,
          sub: 'Discover Coffee',
          titlecont: 'Revolutionize the global tea market with oversea expansions',
          cont: `As the company continues to grow in all aspects, 
          TP TEA is ready to conquer the world. The first overseas store in Hong Kong generated nothing but positive reviews. 
          In 2017, TP TEA expanded to Shanghai and central China. In the future, 
          the company will open stores to reach southeast Asia and northeast Asia with its wonderful tea drinks.`,
        },
        {
          img: 'assets/panel.jpg',
          isBtnHidden: true,
        },
      ],
    }
  },
}
</script>
<style>
</style>
