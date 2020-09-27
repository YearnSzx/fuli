
// 封装网址便于调用
import axios from 'axios'
//http://api.jkzn365.com/vip/api/ext/wxconfig
import {getCookie,setCookie} from '@/utils/cookie'
// http://api.jkzn365.com/guide/
export let url = 'http://api.jkzn365.com/'
export let instance = axios.create({    //instance是自己创建的方法
    baseURL: url,
    headers: {'Token':getCookie('token'),'flags':'wx'},
    withCredentials: true, // 允许携带cookie
    timeout: 15000 // 请求超时时间
});
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)

export let fuliUrl = 'http://api.jkzn365.com/guide/'
export let instanceFuli = axios.create({    //instanceFuli是自己创建的方法
    baseURL: fuliUrl,
    headers: {'Token':getCookie('token'),'flags':'wx'},
    withCredentials: true, // 允许携带cookie
    timeout: 15000 // 请求超时时间
});
instanceFuli.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)