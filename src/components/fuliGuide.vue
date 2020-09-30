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
  getWXconfig2020,
  savevisitelog
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
      audioList:[],             // 音频路径合集
      routerShow:false,         
      audio_url:'',             // 音频当前点击的url储存
      _map:null,                // 获取一个可以随时调用的地图
      comeSite:[],              // 获取点击marker的坐标
      coords3:[],               // 获取一个新的coords
      longitude:'',             // 取出自身定位x的值
      latitude:'',              // 取出自身定位y的值
      vlGuid:null,
      lastExhguid:null
    };
  },
  methods: {
    // 微信定位以及高德地图步行导航
    getLocation(){
      let _this=this
      wx.ready(function(res) {
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res){
              // alert('进入成功');
              console.log(res)
              // alert(res.data.data.latitude+'位置')
              let latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
              let longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
              // var speed = res.speed; // 速度，以米/每秒计
              // var accuracy = res.accuracy; // 位置精度
              // console.log(latitude + ',' + longitude)
              // _this.address =longitude+','+latitude
              // _this.getLIst(longitude,latitude)
              // _this.addressFun(latitude,longitude)
              _this.longitude = longitude
              _this.latitude = latitude
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
                  // position: new AMap.LngLat(longitude,latitude),
                  position: new AMap.LngLat(longitude,latitude),
                  icon: startIcon,
                  // offset: new AMap.Pixel(-13, -30),
                  label: Label,
                  animation:'AMAP_ANIMATION_BOUNCE'
              });
              _this._map.add([startMarker]);
              //步行导航
              // _this._map.plugin('AMap.Walking',function(){
              //   _this.walking = new AMap.Walking({
              //       map: _this._map,
              //       panel: "panel"
              //   }); 
              //   //根据起终点坐标规划步行路线
              //   _this.walking.search([longitude, latitude], [_this.comeSite[0][0], _this.comeSite[0][1]], function(status, result) {
              //       // // result即是对应的步行路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_WalkingResult
              //       // if (status === 'complete') {
              //       //     log.success('绘制步行路线完成')
              //       // } else {
              //       //     log.error('步行路线数据查询失败' + result)
              //       // } 
              //   });
              // })
          },
          fail: function(err) {
            // alert('定位失败')
          }
        });
      })
    },
    
    // 路线导航的出现
    routerIsShow:function(){
        this.routerShow = !this.routerShow;
    },

    positionting:function(index){
        this.audio_url = this.audioList[index].audioUrl
    },

    // 计算停留时间接口
    savevisite:function(item){
      // 停留事件
      let _this = this
      if(_this.vlGuid != null){
        let data2={
          bsGuid:item.bsGuid,
          bsName:item.bsName,
          exhGuid:_this.lastExhguid,
          openid:item.openid,
          simGuid:item.simGuid,
          doneFlag:'Update',   // Update
          type:item.type,
          vlGuid:item.vlGuid,       // 有值
        }
        savevisitelog(data2).then((res)=>{      // doneFlag = Update
          console.log(res)
          _this.vlGuid = res.data.data.vlGuid
        })
      }

      let data={
        bsGuid:item.bsGuid,
        bsName:item.bsName,
        exhGuid:item.exhGuid,
        openid:item.openid,
        simGuid:item.simGuid,
        doneFlag:'Add',   // Add
        type:item.type,
        vlGuid:item.vlGuid,       // ''
      }
      _this.lastExhguid = item.exhGuid
      savevisitelog(data).then((res)=>{      // doneFlag = Update
        console.log(res)
        _this.vlGuid = res.data.data.vlGuid
      })
      // if(_this.vlGuid == null){
      //   savevisitelog(bsGuid,bsName,nowData,openId,simGuid,doneFlag,type,vlGuid).then((res)=>{      // doneFlag = Add
      //     console.log(res)
      //     _this.vlGuid = res.data.data.vlGuid
      //   })
      //   _this.lastExhguid = nowData
      // }else{
      // }
      // let data2 = {
      //   bsGuid:this.$cookie.getCookie('bsGuid'),
      //   bsName:this.$cookie.getCookie('bsName'),
      //   exhGuid:'1d2883d54632ceb84b0c9d2c5038de0d8f44',
      //   openId:this.$cookie.getCookie('openId'),
      //   simGuid:'3a0311d6ca94fd37403e99717b1827c06c96',
      //   doneFlag:'Add',
      //   type:2,
      //   vlGuid:''
      // }
      // console.log(data2)
      
      
      // savevisitelog(this.$cookie.getCookie('bsGuid'),
      // this.$cookie.getCookie('bsName'),
      // '1d2883d54632ceb84b0c9d2c5038de0d8f44',
      // this.$cookie.getCookie('openId'),
      // '3a0311d6ca94fd37403e99717b1827c06c96','Add',2,'').then((res)=>{
      //   console.log(res)
      // })
    },

    // 循环创建icon
    IconCreate(coords,map,elementExhGuid){
      map.clearMap();                               // 清除标记点     
      
      var endIcon = new AMap.Icon({                 // 创建一个 icon
        size: new AMap.Size(25, 40),
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
      coords.forEach((cod,index) => {                // 使用foreach循环添加标记点
        // 旅游景点标注
        var markerlabel = {
          offset: new AMap.Pixel(0,0),
          content: cod[3],
          direction: "top"
        };
        var start = new AMap.Icon({                 // 创建一个 icon
          size: new AMap.Size(25, 40),
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
        
        // 构建信息窗体中显示的内容
        var info = [];
        info.push(`
          <div style=\"padding:7px 0px 0px 0px;\"><h4>${cod[3]}</h4>
            <p class='input-item'>${cod[4]}</p>
            <p class='input-item'>${cod[7]}</p>
          </div>
        `);

        // 使用默认信息窗体框样式，显示信息内容
        var infoWindow = new AMap.InfoWindow({
          content: info.join(""),  
          offset: new AMap.Pixel(0, -23)
        });

        map.add([endMarker]);   // 将 markers 添加到地图                  
        markers.push(endMarker)

        // 判断是否为扫码进入
        if(this.$cookie.getCookie('exhguid') == cod[0]){
          endMarker.setIcon(clickIcon)
          infoWindow.open(map, [cod[2][0],cod[2][1]]);
          // simguid,exhguid
          let data = {
            bsGuid:this.$cookie.getCookie('bsGuid'),
            bsName:this.$cookie.getCookie('bsName'),
            exhGuid:cod[0],
            openid:this.$cookie.getCookie('openid'),
            simGuid:simguid,
            // doneFlag:'Add',
            type:2,
            vlGuid:_this.vlGuid
          }
          // savevisite(data)                                   // 上传
          _this.audio_url = _this.audioList[0].audioUrl      // 自动播放第一个音乐
          // savevisite(this.$cookie.getCookie('bsGuid'),this.$cookie.getCookie('bsName'),exhguid,this.$cookie.getCookie('openId'),simGuid,'Add',2,_this.vlGuid,cod)
          console.log(cod)
        }
        AMap.event.addListener(endMarker,'click',function () { // 添加点击事件,传入对象名，事件名，回调函数
            // 点击进入先清空音频数组
            _this.audio_url = ''                               // 清除音乐
            _this.audioList.splice(0,_this.audioList.length)   // 清空选择音频数组
            if(_this.comeSite != ''){
              _this.comeSite.splice(0,_this.comeSite.length)   // 清空之前点击坐标
            }
            _this.comeSite.push(cod[2])

            // 点击图标判断elementExhGuid是否为空
            if(elementExhGuid == '' || elementExhGuid == undefined){
              // 景点扩展信息表数据列表（语音数据list）
              getexhibitaudiolist(_this.$cookie.getCookie('bsGuid'),cod[0]).then((res)=>{
                console.log(res)
                let audioUrl = res.data.data
                // audioList
                console.log(_this.audioList)
                audioUrl.forEach((aUrl,index) => {
                  _this.audioList.push({exaGuid:aUrl.exaGuid,name:aUrl.audioName,audioUrl:aUrl.audioUrl})
                });
              })
            }

            // 信息窗体的打开
            infoWindow.open(map, [cod[2][0],cod[2][1]]);
            
            // 点击之后marker出现的图标
            endMarker.setIcon(clickIcon)

            // 改变前一个点击的marker 
            sessionStorage.setItem('siteX',cod[2][0])
            sessionStorage.setItem('siteY',cod[2][1])   
            let newSiteX = sessionStorage.getItem('siteX')
            let newSiteY = sessionStorage.getItem('siteY')
            let positions = []
            positions.push([parseFloat(newSiteX),parseFloat(newSiteY)])
            if(oldSiteX == '' && oldSiteY == ''){
              oldSiteX = sessionStorage.getItem('siteX')
              oldSiteY = sessionStorage.getItem('siteY')
            }else if(oldSiteX == newSiteX && oldSiteY == newSiteY){
              alert('332进入成功')
              oldSiteX = newSiteX
              oldSiteY = newSiteY
            }else{
              positions.push([parseFloat(oldSiteX),parseFloat(oldSiteY)])
              if(positions.length > 1){                                                 // 判断positions长度是否大于1
                coords.forEach((cod,index1) => {                                        // 创建对比循环，获取最初数据源coords
                  if(cod[2][0] == positions[1][0] && cod[2][1] == positions[1][1]){     // 对比合适获得下标
                    markers[index1].setIcon(start)                                      // 得到上一个点击的marker下标后，为此下标的marker重新给一个icon
                  }
                });
              }
              oldSiteX = newSiteX
              oldSiteY = newSiteY
            }
            // 点击之后成为地图中心点
            // map.setCenter([cod[0],cod[1]])
        })  
        // 点击事件的结束
        // 点击地图产生的效果，
        map.on('click', function(){
          infoWindow.close()
          endMarker.setIcon(start)
          let data = {
            bsGuid:this.$cookie.getCookie('bsGuid'),
            bsName:this.$cookie.getCookie('bsName'),
            exhGuid:cod[0],
            openid:this.$cookie.getCookie('openid'),
            simGuid:simguid,
            // doneFlag:'Update',
            type:2,
            vlGuid:_this.vlGuid
          }
          // savevisite(data)
        });
      });
        
    },
    
    // 点击导航栏
    select:function(index){     
      this.list.forEach(e => {
        e.class=''
      });
      sessionStorage.setItem('key',false);
      this.list.show = sessionStorage.getItem('key')
      this.list[index].class='changeColor'
      let exhGuid = this.list[index].ptGuid
      let _this = this
      // 判断它是否为空，为空就是点击的顶部景点
      if(exhGuid == ''){   
        console.log(_this.coords3)
        _this.IconCreate(_this.coords3,_this._map,exhGuid)
      }else{
        _this.audio_url = ''                               // 清空音乐路径，关闭音乐
        _this.audioList.splice(0,_this.audioList.length)   // 清空选择音频数组
        // 获取公共设施数据列表
        getpublicfacilitieslist(this.$cookie.getCookie("bsGuid"),exhGuid,this.$cookie.getCookie("simGuid")).then((res)=>{
          console.log(res.data.code)
          let publicfacilities = res.data.data
          let coords2 = []
          if(res.data.code == 200){
            // 添加不同导航下的marker信息
            publicfacilities.forEach((pt,index) => {
              coords2.push([pt.pfGuid,pt.bsGuid,pt.coordinate.split(',').map(Number),pt.pfName,'pt.opentime',pt.pfImg,'pt.actName',])
            });
            // 新建marker传入exhGuid值判断是否在景点内,如果不是则为空
            _this.IconCreate(coords2,_this._map,exhGuid)
            console.log(coords2)
          }
        })

      }
    }
  },
  beforeCreate(){               // 微信权限注入
      let data={
        bsCode: this.$cookie.getCookie("bsCode"),
        url: window.location.href.split("#")[0]
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
        //"errMsg":"getLocation:invalid signature"
        wx.error(function(res){
          // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
          console.log(res)
        });
      })
  },
  mounted(){
    let _this = this
    // 查询地图信息（包括地图信息，地图内景点信息，地图内公共设施信息，默认点位坐标）
    getsitemapdetail(this.$cookie.getCookie("bsGuid")).then((res)=>{
      console.log(res)  

      let mapData = res.data.data
      let siteMap = mapData.siteMap
      let exhibitLists = mapData.exhibitList
      this.$cookie.setCookie("simGuid",siteMap.simGuid)
      let coords = []                   // 创建数组接收需要内容
      exhibitLists.forEach((ex,index) => {
        coords.push([ex.exhGuid,ex.bsGuid,ex.coordinate.split(',').map(Number),ex.exhName,ex.opentime,ex.headerUrl,ex.actName,ex.details])
        _this.coords3.push([ex.exhGuid,ex.bsGuid,ex.coordinate.split(',').map(Number),ex.exhName,ex.opentime,ex.headerUrl,ex.actName,ex.details])
      });

      let defaultCoordinate = mapData.defaultCoordinate.split(',').map(Number)  // 中心点坐标，中心点坐标转化数字
      let leftUpCorner = siteMap.leftUpCorner.split(',').map(Number)            // 锁定左上
      let rightDwCorner = siteMap.rightDwCorner.split(',').map(Number)          // 锁定右下
      let lockSite = [siteMap.leftUpCorner,siteMap.rightDwCorner]               // 锁定点坐标
      // 更改头部标识
      document.title=siteMap.proName    


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
      // 定位
      _this.getLocation()

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

      // 创建图标
      this.IconCreate(coords,_this._map)
    })
    .catch((e) => {});

    // 顶部图标的创建
    getpublictypelist(this.$cookie.getCookie("bsGuid")).then((res)=>{
      let topIcons = res.data.data
      topIcons.forEach((topicon,index) => {                                                  // 循环给list添加元素
        this.list.push({id:topicon.id,title:topicon.title,class:"",ptGuid:topicon.ptGuid})   // 添加到list里让顶部导航自动生成
      });
    })
    
    let data2 = {
        bsGuid:this.$cookie.getCookie('bsGuid'),
        bsName:this.$cookie.getCookie('bsName'),
        exhGuid:'1d2883d54632ceb84b0c9d2c5038de0d8f44',
        openid:this.$cookie.getCookie('openId'),
        simGuid:'3a0311d6ca94fd37403e99717b1827c06c96',
        doneFlag:'Add',
        type:2,
        vlGuid:''
      }
      console.log(data2)
    savevisitelog(data2).then((res)=>{      // doneFlag = Update
      console.log(res)
    })
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
