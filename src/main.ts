import { createApp } from 'vue'
import './style/index.scss'
// unocss
import 'uno.css'
// svg-icon
import 'virtual:svg-icons-register'
import SvgIcon from '@c/SvgIcon/index.vue'
// router
import router from '@/router'

import App from './App.vue'
import { pinia } from './store'
import clipboard from './directive/clipboard'
const app = createApp(App)

// 全局注册指令
app.directive('clipboard', clipboard)

// 全局注册组件
app.component('SvgIcon', SvgIcon)
app.use(router)
app.use(pinia)

app.mount('#app')
