<template>
  <div class="hello">
    <div id="container" class="map"></div>
  </div>
</template>

<script>
import {createIcons} from '@/utils/index'

export default {
  name: "inAndOut",
  data() {
    return {
      coords: [
        [110.058434,18.450808,'出入口']
      ],
      imageUrl:'poi_service2.png'
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
