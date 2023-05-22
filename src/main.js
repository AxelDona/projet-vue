import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import KProgress from 'k-progress-v3';

const app = createApp(App)
app.use(router)
app.component('k-progress', KProgress)
app.mount('#app')