import { createApp } from 'vue';
import router from './router';
import { QueryClient, VueQueryPlugin } from '@tanstack/vue-query';
import App from './App.vue';
import './assets/index.css';
const app = createApp(App);
const queryClient = new QueryClient();
const vueQueryOptions = {
    queryClient,
};
app.use(VueQueryPlugin, vueQueryOptions);
app.use(router);
app.mount('#app');
//# sourceMappingURL=main.js.map