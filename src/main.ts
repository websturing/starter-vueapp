import { createHead } from '@vueuse/head';
import { createNotivue } from 'notivue';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
import { getCookie } from './lib/cookies';
import router from './router';
import { useAuthStore } from './stores/auth';

import '@assets/css/argon-dashboard.css?v=2.1.0';
import '@assets/js/argon-dashboard.min.js?v=2.1.0';
import Aura from '@primevue/themes/aura';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import Button from 'primevue/button';
import Column from 'primevue/column';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import IconField from 'primevue/iconfield';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';

import Paginator from 'primevue/paginator';

import '@assets/css/kai-main.css';
import 'notivue/animations.css';
import 'notivue/notification.css';
import 'primeicons/primeicons.css';

const notivue = createNotivue(/* Options */)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App)

app.use(createHead())
app.use(pinia)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'light',
            cssLayer: false
        }
    }
});
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('Paginator', Paginator)
app.component('InputText', InputText)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('Button', Button)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('Dialog', Dialog)
app.use(ConfirmationService)
app.use(router)
app.use(notivue)

// ⚡ Jalankan inisialisasi auth SETELAH router tapi SEBELUM mount
router.isReady().then(async () => {
    try {
        const auth = useAuthStore();
        const token = getCookie('XSRF-TOKEN');

        if (token) {
            // Cek token valid tanpa langsung redirect
            await auth.fetchUser().catch(() => {
                document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            });
        }
    } finally {
        app.mount('#app');
    }
});
