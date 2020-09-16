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
            <div class="rouImg" @click="routerIsShow()">
                <img src='@/assets/map/route_zh.png' alt="">    
            </div>
        </div>
    </div>

    <div class="Router" v-show="routerShow">
        <div class="chooseRouter">
            <div class="lineChoose"></div>
            <div class="exitChoose" @click="routerIsShow()">退出路线</div>
        </div>
        <div class="routerShowBack"></div>
    </div>
  </div>
</template>

<script>

  export default {
    name : 'foot',
    data () {
      return {
          routerShow:true
      };
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
        routerIsShow:function(){
            this.routerShow = !this.routerShow;
        },
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

/* 选择路线 */
.Router{
    width: 100%;
    display: flex;
    align-items: flex-end;
    position: fixed;
    top: 42px;
    bottom: 0;
}
.routerShowBack{
    width: 100%;
    height: 100%;
    background: black;
    position: absolute;
    opacity: 0.1;
}
.chooseRouter{
    width: 90%;
    height: 140px;
    margin: 0 auto;
    margin-bottom: 8%;
    z-index: 999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}
.chooseRouter>div{
    width: 100%;
    border-radius: 15px;
}
.lineChoose{
    height: 86px;
    background: white;
}
.exitChoose{
    height: 47px;
    background: white;
    color: blue;
    line-height: 47px;
    font-size: 13px;
}

</style>