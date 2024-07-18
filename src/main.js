import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import './index.css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


// createApp(App).use(store)

createApp(App).use(store).use(ElementPlus).mount('#app')
