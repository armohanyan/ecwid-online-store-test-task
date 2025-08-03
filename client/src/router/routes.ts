import type { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
    {
        path: '',
        component: () => import('@/views/LandingView.vue'),
        children: [],
    },
    {
        path: '/settings',
        component: () => import('@/views/SettingsView.vue'),
        children: [],
    },
];
