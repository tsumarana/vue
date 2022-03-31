import { createApp } from 'vue'
import router from './router/index'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './style/index.less'
import * as api from './api/index'


const app = createApp(App)
app.config.globalProperties.$api = api

app.use(ElementPlus)
.use(router)
.mount('#app')
