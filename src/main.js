import './assets/main.css'

import { createApp } from 'vue'
import VueFeather from 'vue-feather';
import App from './App.vue'
import router from './router'

import axios from 'axios'
import VueAxios from 'vue-axios'

export const app = createApp(App)

app.use(router)
app.use(router)
app.use(VueAxios, axios)
app.component(VueFeather.name, VueFeather);

app.mount('#app')
