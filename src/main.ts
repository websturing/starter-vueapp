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
import BlockUI from 'primevue/blockui';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Chart from 'primevue/chart';
import Checkbox from 'primevue/checkbox';
import CheckboxGroup from 'primevue/checkboxgroup';
import Column from 'primevue/column';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmPopup from 'primevue/confirmpopup';
import DataTable from 'primevue/datatable';
import DatePicker from 'primevue/datepicker';
import Dialog from 'primevue/dialog';
import FloatLabel from 'primevue/floatlabel';
import Skeleton from 'primevue/skeleton';

import IconField from 'primevue/iconfield';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputIcon from 'primevue/inputicon';
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Tag from 'primevue/tag';
import Toast from 'primevue/toast';
import ToggleButton from 'primevue/togglebutton';
import ToggleSwitch from 'primevue/toggleswitch';
import Tooltip from 'primevue/tooltip';

import ProgressSpinner from 'primevue/progressspinner';


import Panel from 'primevue/panel';








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
app.component('Chart', Chart)
app.component('Column', Column)
app.component('Paginator', Paginator)
app.component('InputText', InputText)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('Button', Button)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('Dialog', Dialog)
app.component('FloatLabel', FloatLabel)
app.component('ToggleButton', ToggleButton)
app.component('Select', Select)
app.component('Checkbox', Checkbox)
app.component('CheckboxGroup', CheckboxGroup)
app.component('ConfirmPopup', ConfirmPopup)
app.component('Toast', Toast)
app.component('MultiSelect', MultiSelect)
app.component('Tag', Tag);
app.component('ToggleSwitch', ToggleSwitch);
app.component('InputNumber', InputNumber);
app.component('DatePicker', DatePicker);
app.component('Message', Message);
app.component('SelectButton', SelectButton);
app.component('Card', Card);
app.component('Panel', Panel);
app.component('ProgressSpinner', ProgressSpinner);
app.component('BlockUI', BlockUI);
app.component('Skeleton', Skeleton);
app.directive('tooltip', Tooltip);
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
