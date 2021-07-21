import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  document.documentElement.scrollTop = 0
  NProgress.done()
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')