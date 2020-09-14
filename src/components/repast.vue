<template>
  <div class="hello">
    <div id="container" class="map"></div>
  </div>
</template>

<script>
import {createIcons} from '@/utils/index'

export default {
  name: "repast",
  data() {
    return {
      coords: [
        [110.059539,18.455286,'迈泽美食'],  // 迈泽美食
        [110.061596,18.451826,'塔瓦娜餐厅'],  // 塔瓦娜餐厅
        [110.060153,18.451566,'脆脆坊'],  // 脆脆坊
        [110.059224,18.449915,'主要街美食亭'],  // 主要街美食亭
        [110.061784,18.453118,'能量补给站'],  // 能量补给站
        [110.062371,18.454441,'雅典小吃亭']  // 雅典小吃亭
        
      ],
      imageUrl:'poi_service6.png'
    };
  },
  methods: {
    
  },
  mounted(){
    createIcons(this.coords,this.imageUrl)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  width: 100%;
  height: 52.1rem;
}
</style>
