
import {instance,instanceFuli} from '@/api/axiosFZ';
import Qs from "qs"
// bsGuid：f986ecacb0d0ecdb426e83084e8d77662543

// url:'http://wx2019.piaojingtong.net/'

// 以下三个接口是用来微信获取appid和位置和token
export function getAppid(data){ 
  return instance.post("vip/api/ext/getappid", Qs.stringify(data) ,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} })
}
export function getToken(data1){
  return instance.post("vip/api/ext/vipwxtoken", Qs.stringify(data1) ,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} })
}
export function getWXconfig2020(data){
  return instance.post("vip/api/ext/wxconfig2020", Qs.stringify(data) ,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} })
}
// 到这为止 


// 根据bsGuid查询地图信息
export function getsitemapdetail(bsGuid){
  let data1 = Qs.stringify({bsGuid:bsGuid}) 
  return instanceFuli.post("/api/ext/getsitemapdetail", data1,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} })
}
//获取公共设施数据列表
export function getpublicfacilitieslist(bsGuid,ptGuid,simGuid){
  let data = Qs.stringify({bsGuid:bsGuid,ptGuid:ptGuid,simGuid:simGuid}) 
  return instanceFuli.post("/api/ext/getpublicfacilitieslist", data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} })
}
//获取公共类型表数据列表List
export function getpublictypelist(bsGuid){
  let data = Qs.stringify({bsGuid:bsGuid}) 
  return instanceFuli.post("/api/ext/getpublictypelist",data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} })
}
//获取景点扩展信息表数据列表（语音数据list）
export function getexhibitaudiolist(bsGuid,exhGuid) {
  let data = Qs.stringify({bsGuid:bsGuid,exhGuid:exhGuid}) 
  return instanceFuli.post("/api/ext/getexhibitaudiolist",data,{ headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'} })
}