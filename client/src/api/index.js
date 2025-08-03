import request from '@/plugins/axios-interceptors/global.interceptor';
function getRecentProducts(params) {
    return request({
        url: '/products',
        params,
    });
}
export { getRecentProducts };
//# sourceMappingURL=index.js.map