<template>
  <div class="hello">
    <div class="headerBox">
      <header>
        <div v-for="(item,index) in list" :class="item.class" :key='index' @click="select(index)">
          <a href="#" :id="item.id">{{item.title}}</a>
        </div>
      </header>
    </div><div id="panel"></div>
    <section id="container" class="map">
      <audio :src="audio_url"  autoplay>
          Your browser does not support the audio element.
      </audio>
    </section>
    <div class="foot">
      <div class="buttonBox">
          <div class="audioImg">
              <div v-for="(item,index) in audioList" :key="index" @click="positionting(index)">
                  <img src="@/assets/map/male_def.png" alt="">
              </div>
          </div>
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
  </div>
</template>

<script>
import {
  getsitemapdetail,
  getpublicfacilitieslist,
  getpublictypelist,
  getexhibitaudiolist,
  getWXconfig2020
  } from '@/utils/index'
import wx from 'weixin-js-sdk'
import $ from 'jquery'
export default {
  name: "fuliGuide",
  data() {
    return {
      list:[
        {id:0,title:'景点',class:'changeColor',ptGuid:''},
      ],
      audioList:[

      ],
      routerShow:false,
      audio_url:'',
      _map:null,
      nowSite:[],
      comeSite:[],
      coords3:[]     //获取一个新的coords
    };
  },
  methods: {
    routerIsShow:function(){
        this.routerShow = !this.routerShow;
    },
    positionting:function(index){
        console.log('进入定位')
        console.log(this.audioList)
        console.log(this.audioList[index].audioUrl)
        this.audio_url = this.audioList[index].audioUrl
    },
      //  循环创建icon
    IconCreate(coords,map,elementExhGuid){
      // console.log(coords[0][0])
      // 清除标记点      

      map.clearMap();
      
      var endIcon = new AMap.Icon({                 // 创建一个 icon
        size: new AMap.Size(25, 40),
        // image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        image: require('../assets/map/poi.png'),
        imageSize: new AMap.Size(40, 40),
        imageOffset: new AMap.Pixel(-7, -3)
      });
      var clickIcon = new AMap.Icon({               // 点击之后出现的动态图标
        image: require("../assets/map/poi_active.gif"),
        size: new AMap.Size(25, 40),
        imageSize: new AMap.Size(25, 25),
      });

      let oldSiteX = ''
      let oldSiteY = ''
      let markers = []
      let _this = this
      // console.log(this.audioList)
      coords.forEach((cod,index) => {                // 使用foreach循环添加标记点
        // console.log(cod)
        // console.log(cod)
        // function endIconCreate(torf){ 
        //   var waitIcon;                            // 创建一个等待标识的icon
        //   if(torf != undefined){                   // 判断是否有另外标识
        //     waitIcon = new AMap.Icon({             // 如果有创建一个 icon
        //         size: new AMap.Size(25, 40),
        //         // image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        //         image: require('../assets/map/poi'+torf+'.png'),
        //         imageSize: new AMap.Size(30, 31),
        //         imageOffset: new AMap.Pixel(-3, -3)
        //     });
        //     return waitIcon
        //   }else{
        //     return endIcon
        //   }
        // }
        // 旅游景点标注
        var markerlabel = {
          offset: new AMap.Pixel(0,0),
          content: cod[3],
          direction: "top"
        };
        var start = new AMap.Icon({                 // 创建一个 icon
          size: new AMap.Size(25, 40),
          // image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
          image: require('../assets/map/poi.png'),
          imageSize: new AMap.Size(40, 40),
          imageOffset: new AMap.Pixel(-7, -3)
        });
        // 将 icon 传入 marker
        var endMarker = new AMap.Marker({
            size: new AMap.Size(25, 40),
            position: new AMap.LngLat(cod[2][0],cod[2][1]),
            icon: start,
            offset: new AMap.Pixel(-13, -30),
            label: markerlabel 
        });
        map.add([endMarker]);                     // 将 markers 添加到地图
        markers.push(endMarker)
        
        AMap.event.addListener(endMarker,'click',function () { //添加点击事件,传入对象名，事件名，回调函数
            _this.audioList.splice(0,_this.audioList.length)   //清空选择音频数组
            if(_this.comeSite != ''){
              _this.comeSite.splice(0,_this.comeSite.length)   //清空之前点击坐标
            }
            _this.comeSite.push(cod[2])
            console.log(cod[2][0],cod[2][1])
            console.log(cod[2])
            console.log(_this.comeSite[0],_this.comeSite[1])

            //步行导航
            // map.plugin('AMap.Walking',function(){
            //   var walkingOption = {}
            //   var walking = new AMap.Walking({
            //       map: _this._map,
            //       panel: "panel"
            //   }); 
            //   //根据起终点坐标规划步行路线
            //   walking.search([108.382636, 22.790553], [_this.comeSite[0][0], _this.comeSite[0][1]], function(status, result) {
            //       // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
            //       // if (status === 'complete') {
            //       //     log.success('绘制步行路线完成')
            //       // } else {
            //       //     log.error('步行路线数据查询失败' + result)
            //       // } 
            //   });
            // });
            if(elementExhGuid == '' || elementExhGuid == undefined){
              getexhibitaudiolist("f986ecacb0d0ecdb426e83084e8d77662543",cod[0]).then((res)=>{
                console.log(res)
                let audioUrl = res.data.data
                // audioList
                console.log(_this.audioList)
                audioUrl.forEach((aUrl,index) => {
                  _this.audioList.push({exaGuid:aUrl.exaGuid,name:aUrl.audioName,audioUrl:aUrl.audioUrl})
                });
              })
            }
            // openWindowInfo(cod)  //添加信息窗体
            //构建信息窗体中显示的内容
            var info = [];
            // if(cod[3]){
                info.push(`
                <div style=\"padding:7px 0px 0px 0px;\"><h4>活动名称：</h4>
                  <div>
                    <img style='width:50px;height:50px' src='${cod[5]}' alt= >
                  </div>
                  <p class='input-item'>约需等待:分钟</p>
                </div>
                `);
                info.push("")
                info.push("");
                info.push("")
                
                info.push("");
            // }else if(cod[4]){
            //     info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>活动名称："+cod[2]+"</h4>");
            //     info.push("<p class='input-item'>尚未开放</p>");
            //     info.push("<p class='input-item'>活动时间："+cod[4]+"</p>");
            //     info.push("</div>");
            // }else{
            //     info.push("<div style=\"padding:7px 0px 0px 0px;\">");
            //     info.push("<p class='input-item'>"+cod[2]+"</p>");
            //     info.push("</div>");
            // }

            //使用默认信息窗体框样式，显示信息内容
            var infoWindow = new AMap.InfoWindow({
                content: info.join(""),  
                offset: new AMap.Pixel(0, -23)
            });
            // console.log(cod[0])
            infoWindow.open(map, [cod[2][0],cod[2][1]]);
            

            // 点击地图产生的
            map.on('click', function(){
                infoWindow.close()
            });
            //点击之后出现的图标
            endMarker.setIcon(clickIcon)


            // 改变前一个点击的marker 
            sessionStorage.setItem('siteX',cod[2][0])
            sessionStorage.setItem('siteY',cod[2][1])   
            let newSiteX = sessionStorage.getItem('siteX')
            let newSiteY = sessionStorage.getItem('siteY')
            let positions = []
            positions.push([parseFloat(newSiteX),parseFloat(newSiteY)])
            // console.log(positions)
            // console.log('现在的：'+newSiteX+','+newSiteY)
            if(oldSiteX == '' && oldSiteY == ''){
                oldSiteX = sessionStorage.getItem('siteX')
                oldSiteY = sessionStorage.getItem('siteY')
                // console.log('最开始oldSiteX的坐标：'+oldSiteX+','+oldSiteY)
            }else{
                // console.log('最后的坐标：'+oldSiteX+','+oldSiteY)
                positions.push([parseFloat(oldSiteX),parseFloat(oldSiteY)])
                // console.log(positions)
                if(positions.length > 1){
                  coords.forEach((cod,index1) => {                                    // 创建对比循环，获取最初数据源coords
                    // console.log(cod[0],positions[1])
                    if(cod[2][0] == positions[1][0] && cod[2][1] == positions[1][1]){     // 对比合适获得下标
                      // console.log('比较完以后')
                      markers[index1].setIcon(start)                // 得到上一个点击的marker下标后，为此下标的marker重新给一个icon
                    }
                  });
                }
                oldSiteX = newSiteX
                oldSiteY = newSiteY
            }
            // 点击之后成为地图中心点
            // map.setCenter([cod[0],cod[1]])
        })  
        //点击事件的结束

        // map.plugin('AMap.Walking',function(){
        //   //步行导航
        //   var walking = new AMap.Walking({
        //       map: map,
        //       panel: "panel"
        //   }); 
        //   //根据起终点坐标规划步行路线
        //   walking.search([110.05595,18.451149], [110.055945,18.449953], function(status, result) {
        //       // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
        //       if (status === 'complete') {
        //           // log.success('绘制步行路线完成')
        //       } else {
        //           // log.error('步行路线数据查询失败' + result)
        //       } 
        //   });
        //  });
        

        // AMap.service('AMap.Walking',function(){
        //   let MWalk = new AMap.Walking({
        //     map : map
        //   })
        //   MWalk.search([110.059519,18.453242], [110.060826,18.455729], function(status, result) {})
        // })
      });
        
    },
    select:function(index){
      this.list.forEach(e => {
        e.class=''
      });
      sessionStorage.setItem('key',false);
      this.list.show = sessionStorage.getItem('key')
      // this.list[index].show = true
      this.list[index].class='changeColor'
      let exhGuid = this.list[index].ptGuid
      // console.log(this.list[index].ptGuid)
      let _this = this
      if(exhGuid == ''){
        console.log(_this.coords3)
        _this.IconCreate(_this.coords3,_this._map,exhGuid)
      }else{
        getpublicfacilitieslist(this.$cookie.getCookie("bsGuid"),exhGuid,this.$cookie.getCookie("simGuid")).then((res)=>{
          console.log(res.data.code)
          let publicfacilities = res.data.data
          let coords2 = []
          if(res.data.code == 200){
            publicfacilities.forEach((pt,index) => {
              coords2.push([pt.pfGuid,pt.bsGuid,pt.coordinate.split(',').map(Number),pt.pfName,'pt.opentime',pt.pfImg,'pt.actName',])
            });
            _this.IconCreate(coords2,_this._map,exhGuid)
            console.log(coords2)
          }
        })

      }
    }
  },
  beforeCreate(){
      let data={
        bsCode: this.$cookie.getCookie("bsCode"),
        url: encodeURIComponent(window.location.href),
      }
      let _this = this
      getWXconfig2020(data).then((res)=>{
        console.log(res)
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
            timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
            signature: res.data.data.signature,// 必填，签名，见附录1 
            jsApiList: [
                // 所有要调用的 API 都要加到这个列表中
                'openLocation',
                'getLocation'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录3
        });
        //"errMsg":"getLocation:invalid signture"
        wx.ready(function(res) {
          wx.getLocation({
              type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function (res){
                  alert('进入成功');
                  console.log(res)
                  // alert(res.data.data.latitude+'位置')
                  let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                  let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                  var speed = res.speed; // 速度，以米/每秒计
                  var accuracy = res.accuracy; // 位置精度
                  console.log(latitude + ',' + longitude)
                  that.address =longitude+','+latitude
                  that.getLIst(longitude,latitude)
                  that.addressFun(latitude,longitude)
                  var startIcon = new AMap.Icon({ // 创建一个 icon
                      size: new AMap.Size(25, 38),
                      image: require('@/assets/map/my_location.png'),
                      imageSize: new AMap.Size(25, 38),
                  });
                  var Label = {
                      offset: new AMap.Pixel(0, 0),
                      content: '您当前所在位置',
                      direction: "top",
                      anchor:'bottom-center'
                    };
                  var startMarker = new AMap.Marker({
                      position: new AMap.LngLat(longitude,latitude),
                      icon: startIcon,
                      // offset: new AMap.Pixel(-13, -30),
                      label: Label,
                      animation:'AMAP_ANIMATION_BOUNCE'
                  });
                  _this._map.add([startMarker]);
                  //步行导航

                  _map.plugin('AMap.Walking',function(){
                    var walking = new AMap.Walking({
                        map: _this._map,
                        panel: "panel"
                    }); 
                    console.log(_this.comeSite)
                    //根据起终点坐标规划步行路线
                    walking.search([longitude, latitude], [_this.comeSite[0][0], _this.comeSite[0][1]], function(status, result) {
                        // // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
                        // if (status === 'complete') {
                        //     log.success('绘制步行路线完成')
                        // } else {
                        //     log.error('步行路线数据查询失败' + result)
                        // } 
                    });
                  })
              },
              fail: function(err) {
                alert("获取定位位置信息失败！")
              },
              cancel: function (res){
                alert('')
              }
          });
        })
      })
  },
  mounted(){
    // 中心点坐标：defaultCoordinate
    // 锁定坐标左上：leftUpCorner
    // 锁定坐标右下：rightDwCorner
    // 地图图片：proMap
    
    // let bsGuid = 'f986ecacb0d0ecdb426e83084e8d77662543' //商家唯一标识
    let _this = this
    getsitemapdetail(this.$cookie.getCookie("bsGuid")).then((res)=>{
      let mapData = res.data.data
      let siteMap = mapData.siteMap
      let exhibitLists = mapData.exhibitList
      console.log('第一个地图的接口getsitemapdetail：')
      console.log(res)
      this.$cookie.setCookie("simGuid",siteMap.simGuid)
      let coords = []               //创建数组接收需要内容
      exhibitLists.forEach((ex,index) => {
        coords.push([ex.exhGuid,ex.bsGuid,ex.coordinate.split(',').map(Number),ex.exhName,ex.opentime,ex.headerUrl,ex.actName,])
        _this.coords3.push([ex.exhGuid,ex.bsGuid,ex.coordinate.split(',').map(Number),ex.exhName,ex.opentime,ex.headerUrl,ex.actName,])
      });

      let defaultCoordinate = mapData.defaultCoordinate.split(',').map(Number)  // 中心点坐标，中心点坐标转化数字
      let leftUpCorner = siteMap.leftUpCorner.split(',').map(Number)   //锁定左上
      let rightDwCorner = siteMap.rightDwCorner.split(',').map(Number)   //锁定右下
      // 接受中心点坐标

      let lockSite = [siteMap.leftUpCorner,siteMap.rightDwCorner]  //  锁定点坐标
      // createIcons(defaultCoordinate,coords,this.imageUrl,leftUpCorner,rightDwCorner)


      // 开始地图~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~分割线
      var imageLayer = new AMap.ImageLayer({
        url: siteMap.proMap,
        bounds: new AMap.Bounds(
          leftUpCorner,
          rightDwCorner
        ),
        zIndex: 100,
        expandZoomRange:true,
        zooms:[10 , 1000],
        zoomEnable:false,
        dragEnable: false, 
      });
      _this._map = new AMap.Map('container', {
          resizeEnable: true,
          center: defaultCoordinate,
          layers: [
              new AMap.TileLayer(),
              imageLayer
          ]
      });

      // 锁定边界
      function lockBounds() {
        //通过 new AMap.Bounds(southWest:LngLat, northEast:LngLat) 或者 map.getBounds() 获得地图Bounds信息
        var mybounds = new AMap.Bounds(leftUpCorner,rightDwCorner);
        _this._map.setBounds(mybounds);
        _this._map.setLimitBounds(mybounds);  //锁定
      }
      lockBounds()
      
      //强制设置层级,必须设置于锁定了边界之后
      _this._map.setFitView();
      _this._map.setZoom(16);
      this.IconCreate(coords,_this._map)
    }).catch((e) => {});
      //  顶部图标
    getpublictypelist(this.$cookie.getCookie("bsGuid")).then((res)=>{
      let topIcons = res.data.data
      console.log('图标接口')
      console.log(res)
      topIcons.forEach((topicon,index) => {                                                  // 循环给list添加元素
        this.list.push({id:topicon.id,title:topicon.title,class:"",ptGuid:topicon.ptGuid})   // 添加到list里让顶部导航自动生成
      });
    })
    

      //   以下定位可以直接用
      //   //encodeURIComponent(window.location.href) 动态获取地址
      //   //'http://pjtdl.piaojingtong.net/' 这个是固定地址，本地调试用
      //   getPosition('f986ecacb0d0ecdb426e83084e8d77662543',encodeURIComponent(window.location.href)).then(res=>{  // 改本地调试记得改地址
      //   console.log(res)
      //     wx.config({
      //       debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      //       appId: res.data.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
      //       timestamp: res.data.data.timestamp, // 必填，生成签名的时间戳
      //       nonceStr: res.data.data.nonceStr, // 必填，生成签名的随机串
      //       signature: res.data.data.signature,// 必填，签名，见附录1 
      //       jsApiList: [
      //           // 所有要调用的 API 都要加到这个列表中
      //           'openLocation',
      //           'getLocation'
      //       ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录3
      //   });
      //     wx.ready(function(res) {
      //     wx.getLocation({
      //         type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
      //         success(res) {
      //             alert('进入成功');
      //             console.log(res)
      //             // alert(res.data.data.latitude+'位置')
      //             let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
      //             let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
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
      //   wx.error(function(res){
      //     // console.log(res)
      //     // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      //   });
      // })

    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  width: 100%;
  height: 52.1rem;
}

/* headerCSSstart */
.changeColor{
  border-bottom:2px solid red;
}
div{
  width: 100%;
  z-index: 99;
  background: white;
  /* position: relative; */
}
header{
  width: 100%;
  height: 20%;
  font-size: 0;
  display: -webkit-box;
  display:flex;
  -webkit-flex-wrap:nowrap;
  -ms-flex-wrap:nowrap;
  flex-wrap:nowrap;
  -webkit-box-pack:justify;
  -webkit-justify-content:space-between;
  -ms-flex-pack:justify;
  justify-content:space-between;
}



header>div{
  /* width: 25%; */
  font-size: 0;
  /* display: inline-block; */
}
header>div>a{
  color: black;
  font-size: 1.2rem;
  line-height: 3.4rem;
}
/* headerCSSover */

/* 底部 */
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
    background: none;
}
.buttonBox>div{
    width: 12%;
    background: none;
}
.buttonBox>div>div>img{
    width: 100%;
    opacity: 0.8;
}
.buttonBox>div>div{
  background: none;
}
.audioImg{
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
