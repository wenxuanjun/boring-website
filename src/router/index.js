import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/post/:id',
      name: 'post',
      component: () => import('../views/Post.vue')
    },
    {
      path: '/malageed',
      name: 'malageed',
      component: () => import('../views/Malageed.vue')
    },
    {
      path: '/tool',
      name: 'tool',
      component: () => import('../views/Tool.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ]
})
