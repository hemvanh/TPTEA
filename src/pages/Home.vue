<template >
  <div>
    <et-news v-for="(item,index) in news" :key="index" :item="item">
      <et-news-detail :item="item"></et-news-detail>
    </et-news>
  </div>
</template>
<script>
import etNews from '../components/News'
import etNewsDetail from '../components/NewsDetail'
export default {
  name: 'PageIndex',
  components: {
    etNews,
    etNewsDetail,
  },
  data() {
    return {
      news: [
        {
          img: 'statics/news1.jpg',
          isBtnHidden: false,
          label: 'Learn More',
          title: 'Bring on the fruit',
          subTitle: `What's New`,
          titleContent: 'Top choice for tea to-go',
          content: `TP TEA has cultivated the various segments of the Taiwanese market,
           from cities to suburbs, from the main island to outlying islands and from major
            public transportation hubs to department stores. 
           Each store maintains the highest standard in its offerings.
            In 2016, TP TEA became the top choice for tea drinks with more than 260 stores in Taiwan.`,
        },
        {
          img: 'statics/news2.jpg',
          isBtnHidden: false,
          label: 'Discover Coffee',
          title: 'Find a new favorite',
          subTitle: 'Discover Coffee',
          titleContent: 'Revolutionize the global tea market with oversea expansions',
          content: `As the company continues to grow in all aspects, 
          TP TEA is ready to conquer the world. The first overseas store in Hong Kong generated nothing but positive reviews. 
          In 2017, TP TEA expanded to Shanghai and central China. In the future, 
          the company will open stores to reach southeast Asia and northeast Asia with its wonderful tea drinks.`,
        },
        {
          img: 'statics/news-bottom.jpg',
          isBtnHidden: true,
        },
      ],
    }
  },
}
</script>
<style>
</style>
