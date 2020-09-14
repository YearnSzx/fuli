<template>
  <div class="hello">
    <div id="container" class="map"></div>
  </div>
</template>

<script>
import {createIcons} from '@/utils/index'

export default {
  name: "serviceCenter",
  data() {
    return {
      coords: [
        [110.060765,18.451134,'客服中心'],  // 客服中心
      ],
      imageUrl:'poi_service3.png'
    };
  },
  methods: {},
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
