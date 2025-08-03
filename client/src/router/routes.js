export const routes = [
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
//# sourceMappingURL=routes.js.map