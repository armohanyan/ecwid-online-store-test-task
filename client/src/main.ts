import { createApp } from 'vue';
import router from './router';
import {QueryClient, VueQueryPlugin, VueQueryPluginOptions} from '@tanstack/vue-query';
import App from './App.vue';
import './assets/index.css';

const app = createApp(App);

const queryClient = new QueryClient()
const vueQueryOptions: VueQueryPluginOptions = {
    queryClient,
}
app.use(VueQueryPlugin, vueQueryOptions)

app.use(router);
app.mount('#app');

