import request from '@/plugins/axios-interceptors/global.interceptor'
import { IProduct } from '@/types/product'

function getRecentProducts(params: {
  limit: number
  sortBy?: string
}): Promise<{ items: IProduct[] }> {
  return request({
    url: '/products',
    params,
  })
}

export { getRecentProducts }
