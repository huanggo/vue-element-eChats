// 插件模块
import axios from 'axios'

const MyHttpServer = {}

MyHttpServer.install = (Vue) => {
    // 添加请求拦截器
    axios.interceptors.request.use(function(config) {
        // 在发送请求之前做些什么
        console.log(config.url.split('/'))
        let urlArr = config.url.split('/')
        console.log(urlArr[urlArr.length - 1])
        let url = urlArr[urlArr.length - 1]
        console.log(url !== "login")
        if (url !== "login") {
            const AUTH_TOKEN = localStorage.getItem("token");
            config.headers.common["Authorization"] = AUTH_TOKEN;
        }
        return config;
    }, function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });

    // 添加响应拦截器
    axios.interceptors.response.use(function(response) {
        // 对响应数据做点什么
        return response;
    }, function(error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    });
    // 基本地址
    // axios.defaults.baseURL = 'http://127.0.0.1:8080/api/private/v1/';

    // const AUTH_TOKEN = localStorage.getItem("token");
    // axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    //在请求发起之前设置头部
    //
    // // 4. 添加实例方法
    Vue.prototype.$http = axios
}
export default MyHttpServer