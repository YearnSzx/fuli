<template>
  <div class="hello">
    <div id="container" class="map"></div>
    <!-- <div class="input-card">
      <h4>左击获取经纬度：</h4>
      <div class="input-item">
        <input type="text" readonly="true" id="lnglat">
      </div>
    </div> -->
  </div>
</template>

<script>
import img from '@/assets/map01.jpg'; // 引入图片

export default {
  name: "fuliGuide",
  data() {
    return {
      coords: [
        [110.058044,18.450189,'站点22'],  // 
        [110.060826,18.455729,'宙斯雷电环'],  // 
        [110.060864,18.455205,'赫斯特天地'],   // 赫斯特天地
        [110.062921,18.451846,'雅典娜浴场'],  // 雅典娜浴场
        [110.062672,18.455561,'双神战道'],  // .双神战道
        [110.061754,18.45636,'奥林匹克赛道'],  // 奥林匹克赛道
        [110.060317,18.454248,'德墨特尔城堡'],  // 德墨特尔城堡
        [110.059036,18.453899,'泰坦战场'],  // 泰坦战场
        [110.06062,18.45263,'奥林匹斯挑战池'],  // 奥林匹斯挑战池
        [110.059583,18.452942,'沙滩排球'],  // 沙滩排球
        [110.064086,18.453144,'暴风海神湾'],  // 暴风海神湾
        [110.062714,18.454696,'美杜莎没落之河'],  // 美杜莎没落之河
        [110.061849,18.452309,'科孚冲浪'],  // 科孚冲浪
        [110.064453,18.45464,'争霸塔'],  // 争霸塔
        [110.065209,18.454345,'赫拉彩虹天梯'],  // 赫拉彩虹天梯
        [110.059539,18.455286,'迈泽美食'],  // 迈泽美食
        [110.061194,18.451577,'木马奇珍坊'],  // 木马奇珍坊
        [110.061596,18.451826,'塔瓦娜餐厅'],  // 塔瓦娜餐厅
        [110.060765,18.451134,'客服中心'],  // 客服中心
        [110.059944,18.451989,'更衣室'],  // 更衣室
        [110.059558,18.45121,'寄存处'],  // 寄存处
        [110.059138,18.451085,'售票厅'],  // 售票厅
        [110.060153,18.451566,'脆脆坊'],  // 脆脆坊
        [110.060921,18.451846,'阳光回忆'],  // 阳光回忆
        [110.061784,18.453118,'能量补给站'],  // 能量补给站
        [110.059224,18.449915,'主要街美食亭'],  // 主要街美食亭
        [110.061438,18.453856,'冰激点'],  // 冰激点
        [110.062371,18.454441,'雅典小吃亭']  // 雅典小吃亭
      ]
    };
  },
  methods: {
    GaodeMap() {
      var imageLayer = new AMap.ImageLayer({
          url: img,
          bounds: new AMap.Bounds(
              [110.052538, 18.448676],
              [110.066829, 18.458202]
          ),
          zIndex: 100,
          expandZoomRange:true,
          zooms:[16, 20]
      });
      var map = new AMap.Map('container', {
          resizeEnable: true,
          center: [110.05624201782237, 18.45443327700067],
            layers: [
                new AMap.TileLayer(),
                imageLayer
            ]
      });
      AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
        map.addControl(new AMap.ToolBar());
        map.addControl(new AMap.Scale());
      });

      // 锁定边界
      function lockBounds() {
        //通过 new AMap.Bounds(southWest:LngLat, northEast:LngLat) 或者 map.getBounds() 获得地图Bounds信息
        var mybounds = new AMap.Bounds([110.052538, 18.448676],[110.066829, 18.458202]);
        map.setBounds(mybounds);
        map.setLimitBounds(mybounds);  //锁定
      }
      lockBounds()

      
      //强制设置层级,必须设置于锁定了边界之后
      map.setFitView();
      map.setZoom(17);

      //为地图注册click事件获取鼠标点击出的经纬度坐标
      // map.on('click', function(e) {
      //     document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat()
      // });

      let cods = this.coords

      function IconCreate(cods){
        // 创建一个 icon
        var endIcon = new AMap.Icon({
            size: new AMap.Size(25, 34),
            // image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
            image: require('../assets/map/poi0.png'),
            imageSize: new AMap.Size(40, 40),
            imageOffset: new AMap.Pixel(-7, -3)
        });
        // 使用foreach循环添加标记点 
        cods.forEach((cod,index) => {
          // console.log(cod)
          var markerlabel = {
            offset: new AMap.Pixel(-15, -18),
            content: cod[2],
            direction: "top"
          };
          // 将 icon 传入 marker
          var endMarker = new AMap.Marker({
              position: new AMap.LngLat(cod[0],cod[1]),
              icon: endIcon,
              offset: new AMap.Pixel(-13, -30),
              label: markerlabel
          });
          // 将 markers 添加到地图
          map.add([endMarker]);
        });
      }
      IconCreate(cods)
          // var infoWindow = new AMap.InfoWindow({
      //     content: 'asdf',  //使用默认信息窗体框样式，显示信息内容
      //     anchor: 'bottom-center'
      // });
      // infoWindow.open(map, map.getCenter());
    },
  },
  mounted(){
    this.GaodeMap()
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
