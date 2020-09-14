<template>
  <div class="hello">
    <div id="container" class="map"></div>
  </div>
</template>

<script>
import {createIcons} from '@/utils/index'

export default {
  name: "wcRoom",
  data() {
    return {
      coords: [
        [110.05595,18.451149,'我是卫生间1号'],
        [110.055945,18.449953,'我是卫生间2号'],
        [110.059458,18.451454,'我是卫生间3号'],
        [110.059871,18.449872,'我是卫生间4号'],
        [110.06206,18.451597,'我是卫生间5号'],
        [110.063186,18.455683,'我是卫生间6号']
      ],
      imageUrl:'poi_service1.png'
    };
  },
  methods: {},
  mounted(){
    // 地图创建
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
