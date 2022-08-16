import { createApp } from 'vue';
import './style/index.scss';
// unocss
import 'uno.css';
// svg-icon
import 'virtual:svg-icons-register';
import SvgIcon from '@c/SvgIcon/index.vue';
// router
import router from '@/router';

import App from './App.vue';
import gradientPoint from './directive/gradientPoint';

const app = createApp(App);
// 全局注册组件
app.component('SvgIcon', SvgIcon);
// 全局注册指令
app.directive('gradient', gradientPoint);
app.use(router);

app.mount('#app');
