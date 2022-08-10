import { createApp } from 'vue';
import './style.css';
// unocss
import 'uno.css';
// svg-icon
import 'virtual:svg-icons-register';
// naive-ui
import naive from 'naive-ui';

import App from './App.vue';
const app = createApp(App);
app.use(naive);

app.mount('#app');
