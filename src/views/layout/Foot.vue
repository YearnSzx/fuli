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
// import {getLocation} from '../../utils/index'
// import {getPosition} from '../../utils/index'
import wx from 'weixin-js-sdk'
  export default {
    name : 'foot',
    data () {
      return {
          routerShow:false
      };
    },
    computed: {},
    beforeMount() {},
    mounted() {
        
    },
    methods: {
        routerIsShow:function(){
            this.routerShow = !this.routerShow;
        },
        positionting:function(){
            console.log('进入定位')
            // wx.ready(function() {
            //     wx.getLocation({
            //         type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            //         success: function(res) {
            //             console.log(res);
            //             alert(res.data.data.latitude+'位置')
            //             latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            //             longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            //             var speed = res.speed; // 速度，以米/每秒计
            //             var accuracy = res.accuracy; // 位置精度
            //             console.log(latitude + ',' + longitude)
            //             //that.address =longitude+','+latitude
            //             that.getLIst(longitude,latitude)
            //             that.addressFun(latitude,longitude)
            //         },
            //         fail: function(err) {
            //         alert("获取定位位置信息失败！")
            //         },
            //         cancel: function (res){
            //         alert('我草')
            //         }
            //     });
            // })
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
    background: none;
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