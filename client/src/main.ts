import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import './bootstrap';
import { globalAxiosInterceptor } from '@/plugins/axios-interceptors/global.interceptor';
import { signRequestInterceptor } from '@/plugins/axios-interceptors/sign-request.interceptor';
import { unauthorizedResponseInterceptor } from '@/plugins/axios-interceptors/unauth-response.interceptor';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);

app.use(VueQueryPlugin);

app.use(router);
app.mount('#app');

app.use(globalAxiosInterceptor);
app.use(unauthorizedResponseInterceptor);
