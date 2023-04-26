
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import StyleCss from '@/assets/scss/main.scss'
import store from './store'
import VueLazyload from 'vue-lazyload'

createApp(App).use(VueAxios, axios).use(StyleCss).use(store).use(router).use(VueLazyload).mount('#app')
