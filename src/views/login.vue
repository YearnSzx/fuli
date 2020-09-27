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

    components: {},

    computed: {},

    beforeMount() {},
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
        console.log(code)
        console.log(this.$cookie.getCookie("token"))
        // 判断是否是从微信回来，如果是，code就不会为null
        if(code==null&&this.$cookie.getCookie("token")==''||this.$cookie.getCookie("token")==null||this.$cookie.getCookie("token")==undefined){
            // let bsCode = 42309967
            // console.log('先进到这里')
            let data={
                bsCode: this.getUrlKey('bsCode'), 
                url: encodeURIComponent(window.location.href)
            }
            console.log(data)
            getAppid(data).then(res=>{
                console.log('getAppid接口')
                console.log(res)
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
            console.log(code)
            console.log('我可qnm的执行这条')
            console.log(this.$cookie.getCookie("token"))
            this.$router.push('/fuliGuide')
        }else{
            // alert('进到你以为不会进的地方了')
           let data={
                // code: code,
                bsCode: 42309967,
                authCode: code,
                // url: encodeURIComponent(window.location.href),
                // vipGuid: ''
            }
            console.log(1111)
            getToken(data).then(res=>{
                // alert('进到个人信息了')
                if(res.data.code == 200){
                    console.log('getToken接口：')
                    console.log(res)
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

</style>