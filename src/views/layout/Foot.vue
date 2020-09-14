<template>
  <div class="foot">
    <div class="buttonBox">
        <div class="locationImg" @click="positionting()">
            <div>
                <img src="@/assets/map/location.png" alt="">
            </div>
        </div>
        <div></div>
        <div class="routerImg">
            <div class="rouImg">
                <img src='@/assets/map/route_zh.png' alt="">    
            </div>
            <div class="Router">

            </div>
        </div>
    </div>
  </div>
</template>

<script>

  export default {
    name : 'foot',
    data () {
      return {
          list:[
              {
                  url:''
              }
          ]
      };
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        positionting:function(){
            console.log(123456)
            wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                // alert(res);
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                var speed = res.speed; // 速度，以米/每秒计
                var accuracy = res.accuracy; // 位置精度
                var marker = new AMap.Marker({
                    icon: "../../static/images/map/poi_active.gif",
                    position: [longitude, latitude],
                    // offset: new AMap.Pixel(-13, -30),
                    // label:markerlabel
                });
                markers.push(marker);
                marker.setMap(map);
                map.setCenter(longitude, latitude);
            }
        });
        }
    },

    watch: {}

  }

</script>
<style scoped>
.foot{
    z-index: 99;
    width: 100%;
    position: absolute;
    bottom: 0;
}
.buttonBox{
    display: flex;
    justify-content: space-between;
    align-items:center;
}
.buttonBox>div{
    width: 12%;
}
.buttonBox>div>div>img{
    width: 100%;
    opacity: 0.8;
}
.locationImg{
    margin-left: 4%;
    margin-bottom: 1%; 
}
.routerImg{
    margin-right: 4%;
    margin-bottom: 1%;
}
.routerImg>div{
    width: 100%;
}
</style>