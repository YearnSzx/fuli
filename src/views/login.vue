<template>

</template>

<script>
import {getCookie} from '@/utils/cookie'
import {getAppid,getToken} from '@/utils/index'
import wx from 'weixin-js-sdk'

  export default {
    data () {
      return {

      };
    },
    methods: {
        getUrlKey(name) {
            return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
        },
        getQueryString(name) {
            let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            let r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            } else {
                return null;
            }
        },
    },
    
    mounted() {
        let code = this.getQueryString('code');
        let exhguid= this.getUrlKey('exhguid')
        // 判断是否是从扫码来的
        this.$cookie.setCookie('exhguid',exhguid)

        // 判断是否是从微信回来，如果是，code就不会为null
        if(code==null&&this.$cookie.getCookie("token")==''||this.$cookie.getCookie("token")==null||this.$cookie.getCookie("token")==undefined){
            let data={
                bsCode: this.getUrlKey('bsCode'), 
                url: encodeURIComponent(window.location.href)
            }
            console.log(data)
            getAppid(data).then(res=>{
           
                if(res.data.code == 200){
                    const appid =res.data.data
                    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=` + appid + `&redirect_uri=${data.url}&response_type=code&scope=snsapi_base&state=123#wechat_redirect&connect_redirect=1`
                    window.event.returnValue = false;
                    return false;
                }
            })
            .catch((error)=>
                {console.log(error)
            })

        }else if(code==null&&this.$cookie.getCookie("token")!=''&&this.$cookie.getCookie("token")!=null&&this.$cookie.getCookie("token")!=undefined){
            this.$router.push('/fuliGuide')
        }else{
           let data={
                bsCode: 42309967,
                authCode: code,
            }
            getToken(data).then(res=>{
                if(res.data.code == 200){
                    this.$cookie.setCookie('bsCode',res.data.data.bsCode)
                    this.$cookie.setCookie('bsName',res.data.data.bsName)
                    this.$cookie.setCookie('openId',res.data.data.openId)
                    this.$cookie.setCookie('bsGuid',res.data.data.bsGuid)
                    this.$cookie.setCookie('token',res.data.data.token)
                    this.$router.push('/fuliGuide')
                }
            })
            .catch((error)=>
                {console.log(error)
            })
        }
    },
    watch: {}

  }

</script>
<style  scoped>
.avc{
    line-height: ;
}
</style>