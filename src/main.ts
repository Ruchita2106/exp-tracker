import './assets/style.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import "@mdi/font/css/materialdesignicons.css";
import Datepicker from 'vue3-datepicker'
const app = createApp(App)
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "mdi",
  }
});
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(Datepicker as any)
app.use(Vue3Toastify, {
  autoClose: 2000
} as ToastContainerOptions)

app.mount('#app')
