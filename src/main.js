import { createApp } from 'vue'
import App from '@/App.vue'
import vuetify from '@/vuetify'
import router from '@/router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import '@/styles/variables.scss'

import '@fontsource/roboto/latin-300.css'
import '@fontsource/roboto/latin-400.css'
import '@fontsource/roboto/latin-500.css'
import '@fontsource/roboto/latin-700.css'

const app = createApp(App)

router.beforeEach((_to, _from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  document.documentElement.scrollTop = 0
  NProgress.done()
})

app.use(vuetify).use(router).mount('#app')