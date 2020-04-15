// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import MyHttpServer from '@/plugins/http.js'

import myBread from './components/cuscom/myBread'
// 回归 axois
// import axios from 'axios'
// Vue.prototype.$http = axios
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/reset.css'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import moment from 'moment'
//是否上线环境
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(MyHttpServer)

//全局过滤器
Vue.filter('fmtdate', (v) => {
        return moment(v).format('YYYY-MM-DD')
    })
    //自定义全局组件
Vue.component('my-bread', myBread)
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})