import { useQuery } from '@tanstack/vue-query'
import { getRecentProductsRequest } from '@/api/products'

export function useRecentProductsQuery(params: {
  limit: number
  sortBy?: string
  responseFields?: string
}) {
  return useQuery({
    queryKey: ['recent-products', params],
    queryFn: () => getRecentProductsRequest(params),
    enabled: false,
    staleTime: 1000 * 60 * 5,
  })
}
