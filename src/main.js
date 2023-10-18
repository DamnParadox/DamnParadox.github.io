import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3ResizeDrag from 'vue3-resize-drag'
import './assets/style/animista.less'

createApp(App).use(router).use(vue3ResizeDrag).mount('#app')
