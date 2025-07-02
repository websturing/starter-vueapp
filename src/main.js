import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@assets/css/argon-dashboard.css?v=2.1.0"
import "@assets/js/argon-dashboard.min.js?v=2.1.0"
createApp(App).use(router).mount('#app')