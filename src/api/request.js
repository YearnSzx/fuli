import axios from 'axios'
// import store from '../store'
// import { getToken } from '@/utils/auth'
// import router from '../router'
// import { Toast } from 'vant';

// create an axios instance
const service = axios.create({
  timeout: 15000 // request timeout
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // if (sessionStorage.getItem('token') != undefined && sessionStorage.getItem('tokenName') != undefined) {
    //   //登陆添加请求头
    //   config.headers[sessionStorage.getItem('tokenName')] = sessionStorage.getItem('token')
    // }
    // if (config.showLoding !== false) {
    //   Toast.loading({
    //     message: '加载中...',
    //     forbidClick: true,
    //     loadingType: 'spinner',
    //     // 是否显示遮罩层
    //     // overlay: true,
    //     duration: 15000
    //   });
    // }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    // Toast.clear()
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (res.code == 401) {
      // Toast.fail(res.message || '没有访问权限!')
      store.dispatch('user/logout')
      router.push('/login')
    }
    if (res.code !== 200) {
      // Toast.fail(res.message || '服务器错误!')
      // return Promise.reject(new Error(res.message || 'Error'))
      return res
    } else {
      return res
    }
  },
  error => {
    // Toast.clear()
    console.log('err' + error) // for debug
    if (error.response) {
      // Toast.fail(error.response.data.message);
    } else {
      // Toast.fail(error.message);
    }
    return Promise.reject(error)
  }
)

export default service
