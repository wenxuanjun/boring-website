import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/malageed',
      name: 'malageed',
      component: () => import('../views/Malageed.vue')
    },
    {
      path: '/tools',
      name: 'tools',
      component: () => import('../views/Tools.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ]
})
