import { createApp } from 'vue'
import router from "@/router/router";
import { createPinia } from 'pinia'
import 'normalize.css';
import './style.css'
import App from './App.vue'

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
