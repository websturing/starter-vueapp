import { createHead } from '@vueuse/head'
import { createNotivue } from 'notivue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import '@assets/css/argon-dashboard.css?v=2.1.0'
import '@assets/js/argon-dashboard.min.js?v=2.1.0'

import 'notivue/animations.css'
import 'notivue/notification.css'
const notivue = createNotivue(/* Options */)

const app = createApp(App)

app.use(createHead())
app.use(createPinia())
app.use(router)
app.use(notivue)
app.mount('#app')
