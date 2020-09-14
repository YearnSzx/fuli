
// 封装网址便于调用

import axios from 'axios'

export let url = ''

export let instance = axios.create({    //instance是自己创建的方法
    baseURL: url,
    headers: {'Content-Type':'application/json'},
    // withCredentials: true, // 允许携带cookie
    timeout: 15000 // 请求超时时间
});
instance.interceptors.response.use(
    response => {return response;},
    error => {
        return Promise.reject(error);
})