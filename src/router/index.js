import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
        },
        {
            path: '/post/:id',
            name: 'post',
            component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue')
        },
        {
            path: '/tool',
            name: 'tool',
            component: () => import(/* webpackChunkName: "tool" */ '../views/Tool.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        }
    ]
})