import "@assets/css/argon-dashboard.css?v=2.1.0";
import "@assets/js/argon-dashboard.min.js?v=2.1.0";
import { createHead } from '@vueuse/head';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App)
app.use(createHead());
app.use(createPinia())
app.use(router)  
app.mount('#app')