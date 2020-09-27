<template>
  <div id="app">
    <router-view/>
    <div style="width:50px;height:50px"></div>
  </div>
</template>

<script>
import {getPosition} from './utils/index'
import {getLocation} from './utils/index'
import wx from 'weixin-js-sdk'
export default {
  name: 'App',
  components:{},
   mounted() {
    // this.$cookie.setCookie('token','8a3f5281266bbcef443ebaecb0764d625464')

    //   getPosition('f986ecacb0d0ecdb426e83084e8d77662543','http://wx2019.piaojingtong.net/')
    //  .then(res=>{
    //   //  console.log(res)
    //   //  wx.config({
    //   //     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   //     appId: res.data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
    //   //     timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
    //   //     nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
    //   //     signature: res.data.data.signature,// 必填，签名，见附录1 
    //   //     jsApiList: [
    //   //         // 所有要调用的 API 都要加到这个列表中
    //   //         'openLocation',
    //   //         'getLocation'
    //   //     ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录3
    //   // });
      
    //  })
    //  .catch((error)=>
    //   {console.log(error)
    //  }) 
    // wx.ready(function(res) {
    //     wx.getLocation({
    //         type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    //         success(res) {
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
    //           alert("获取定位位置信息失败！")
    //         },
    //         cancel: function (res){
    //           alert('')
    //         }
    //     });
    //   })
   },
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
a,li{
  text-decoration: none;
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}
.amap-copyright,.amap-logo{
  display: none!important;
}

/* 地点标注样式 */
.amap-marker-label{
  border: 0;
  padding: 0.4rem;
  border-radius: 5px;
  border: 1px solid bisque;
  color: rgb(70, 169, 220);
}

/* 信息窗体的样式修改 */
.amap-info-content{
  padding: 1rem 1.5rem;
  border-radius: 1.5rem;
}
.input-item{
  height: 2rem;
}

/* mint的样式 */
.mint-navbar .mint-tab-item{
  z-index: 9;
  background: white;
}


/* 音频 */
audio{
  z-index: 999999;
  position: absolute;
  left: 0;
  top: 200px;
}
</style>
