import { useQuery } from '@tanstack/vue-query';
import { getRecentProducts } from '@/api';
export function useRecentProductsQuery(params) {
    return useQuery({
        queryKey: ['recent-products', params],
        queryFn: () => getRecentProducts(params),
        enabled: false,
        staleTime: 1000 * 60 * 5,
    });
}
//# sourceMappingURL=useRecentProductsQuery.js.map