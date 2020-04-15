import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'

import User from '../components/users/users.vue'

import Right from '../components/rights/right.vue'
import Role from '../components/rights/role.vue'
import Goods from '../components/goods/goodslist.vue'
import Orders from '../components/order/order.vue'
import Report from '../components/reports/report.vue'
import GoodsCate from '../components/goods/goodscate.vue'
import Params from '../components/goods/cateparams.vue'
import { Message } from 'element-ui'
Vue.use(Router)

const router = new Router({
        routes: [{
                path: '/Login',
                name: 'Login',
                component: Login
            },
            {
                path: '/',
                name: 'Home',
                component: Home,
                redirect: '/users',
                children: [{
                        name: 'users',
                        path: '/users',
                        component: User
                    },
                    {
                        name: 'rights',
                        path: '/rights',
                        component: Right
                    },
                    {
                        name: 'roles',
                        path: '/roles',
                        component: Role
                    },
                    {
                        name: 'goods',
                        path: '/goods',
                        component: Goods
                    },
                    {
                        name: 'categories',
                        path: '/categories',
                        component: GoodsCate
                    },
                    {
                        name: 'orders',
                        path: '/orders',
                        component: Orders
                    },
                    {
                        name: 'reports',
                        path: '/reports',
                        component: Report
                    },
                    {
                        name: 'params',
                        path: '/params',
                        component: Params
                    }
                ]
            }
        ]
    })
    //to-->要去的路由配置
    //from ->当前的路由配置

router.beforeEach((to, from, next) => {
    console.log(to)
    console.log(to.path)
        // next()
    if (to.path === '/Login') {
        next()
    } else {
        const token = localStorage.getItem("token");
        if (!token) {
            // this.$router.push({ name: 'Login' })
            Message.warning('回到登录页')
            router.push({
                name: 'Login'
            })
            return
        }
        next()
    }
})
export default router
//在路由配置生效之前 统一判断token

//路由。导航 守卫