
import {instance} from '@/api/axiosFZ';
import backgroundImg from '@/assets/map01.jpg'; // 引入地图背景图片
import $ from 'jquery';


export function getCoordInfo(site){  
    return instance.get("",{params: {site: site}},)
}
// 地图创建
export function createIcons(coords,pointImageUrl){
    var imageLayer = new AMap.ImageLayer({
        url: backgroundImg,
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

    // // 放大缩小工具
    // AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
    //     map.addControl(new AMap.ToolBar());
    //     map.addControl(new AMap.Scale());
    // });

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

    let cods = coords

    // 第一个点
    var startIcon = new AMap.Icon({ // 创建一个 icon
        size: new AMap.Size(25, 38),
        // image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        image: require('../assets/map/my_location.png'),
        imageSize: new AMap.Size(25, 38),
        // imageOffset: new AMap.Pixel(-7, -3)
    });
    var Label = {
        offset: new AMap.Pixel(0, 0),
        content: '您当前所在位置',
        direction: "top",
        anchor:'bottom-center'
      };
    var startMarker = new AMap.Marker({
        position: new AMap.LngLat(110.059519,18.453242),
        icon: startIcon,
        // offset: new AMap.Pixel(-13, -30),
        label: Label,
        animation:'AMAP_ANIMATION_BOUNCE'
    });
    map.add([startMarker]);
  

    //  循环创建icon
    function IconCreate(cods){
      var endIcon = new AMap.Icon({                 // 创建一个 icon
        size: new AMap.Size(25, 40),
        // image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        image: require('../assets/map/'+pointImageUrl),
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
      cods.forEach((cod,index) => {                // 使用foreach循环添加标记点
        function endIconCreate(torf){ 
          var waitIcon;                            // 创建一个等待标识的icon
          if(torf != undefined){                   // 判断是否有另外标识
            waitIcon = new AMap.Icon({             // 如果有创建一个 icon
                size: new AMap.Size(25, 40),
                // image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
                image: require('../assets/map/poi'+torf+'.png'),
                imageSize: new AMap.Size(30, 31),
                imageOffset: new AMap.Pixel(-3, -3)
            });
            return waitIcon
          }else{
            return endIcon
          }
        }
        // 旅游景点标注
        var markerlabel = {
          offset: new AMap.Pixel(0,0),
          content: cod[2],
          direction: "top"
        };
        // 将 icon 传入 marker
        var endMarker = new AMap.Marker({
            size: new AMap.Size(25, 40),
            position: new AMap.LngLat(cod[0],cod[1]),
            icon: endIconCreate(cod[3]),
            offset: new AMap.Pixel(-13, -30),
            label: markerlabel
        });
        map.add([endMarker]);                     // 将 markers 添加到地图
        markers.push(endMarker)
        AMap.event.addListener(endMarker,'click',function () { //添加点击事件,传入对象名，事件名，回调函数
            // openWindowInfo(cod)  //添加信息窗体
            //构建信息窗体中显示的内容
            var info = [];
            if(cod[3]){
                info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>活动名称："+cod[2]+"</h4>");
                info.push("<p class='input-item'>尚未开放</p>");
                info.push("<p class='input-item'>活动时间："+cod[4]+"</p>");
                info.push("<p class='input-item'>约需等待:"+cod[3]+"分钟</p></div>");
            }else if(cod[4]){
                info.push("<div style=\"padding:7px 0px 0px 0px;\"><h4>活动名称："+cod[2]+"</h4>");
                info.push("<p class='input-item'>尚未开放</p>");
                info.push("<p class='input-item'>活动时间："+cod[4]+"</p>");
                info.push("</div>");
            }else{
                info.push("<div style=\"padding:7px 0px 0px 0px;\">");
                info.push("<p class='input-item'>"+cod[2]+"</p>");
                info.push("</div>");
            }

            //使用默认信息窗体框样式，显示信息内容
            var infoWindow = new AMap.InfoWindow({
                content: info.join(""),  
                offset: new AMap.Pixel(0, -23)
            });
            infoWindow.open(map, [cod[0],cod[1]]);
            

            // 点击地图产生的
            map.on('click', function(){
                infoWindow.close()
                endMarker.setIcon(endIconCreate(cod[3]))
            });
            //点击之后出现的图标
            endMarker.setIcon(clickIcon)


            // 改变前一个点击的marker 
            sessionStorage.setItem('siteX',cod[0])
            sessionStorage.setItem('siteY',cod[1])   
            let newSiteX = sessionStorage.getItem('siteX')
            let newSiteY = sessionStorage.getItem('siteY')
            let positions = []
            positions.push([newSiteX,newSiteY])
            console.log(positions)
            console.log('现在的：'+newSiteX+','+newSiteY)
            if(oldSiteX == '' && oldSiteY == ''){
                oldSiteX = sessionStorage.getItem('siteX')
                oldSiteY = sessionStorage.getItem('siteY')
                console.log('最开始oldSiteX的坐标：'+oldSiteX+','+oldSiteY)
            }else{
                // console.log('最后的坐标：'+oldSiteX+','+oldSiteY)
                positions.push([oldSiteX,oldSiteY])
                console.log(positions[0][1])
                if(positions.length > 1){
                  // console.log(cods)
                  cods.forEach((cod,index1) => {                                    // 创建对比循环，获取最初数据源cods
                    if(cod[0] == positions[1][0] && cod[1] == positions[1][1]){     // 对比合适获得下标
                      markers[index1].setIcon(endIconCreate(cod[3]))                // 得到上一个点击的marker下标后，为此下标的marker重新给一个icon
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
      });
    }
    IconCreate(cods)
}