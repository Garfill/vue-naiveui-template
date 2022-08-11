import { createApp } from 'vue';
import './style.css';
// unocss
import 'uno.css';
// svg-icon
import 'virtual:svg-icons-register';

import App from './App.vue';
const app = createApp(App);

app.mount('#app');
