import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(_to, _from, savedPosition) {
        return (savedPosition || {
            left: 0,
            top: 0,
            behavior: 'smooth',
        });
    },
});
export default router;
//# sourceMappingURL=index.js.map