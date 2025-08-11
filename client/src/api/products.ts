import request from '@/plugins/axios-interceptors/remote.interceptor'
import { IProduct } from '@/types/product'
import { PRODUCT_FIELDS_USED } from '@/consts'

function getRecentProductsRequest(params: {
  limit: number
  sortBy?: string
  responseFields?: string
}): Promise<{ items: IProduct[]; total: number }> {
  return request({
    url: '/products',
    params: {
      ...params,
      responseFields: params.responseFields || `total,items(${PRODUCT_FIELDS_USED.join(',')})`,
    },
  })
}

export { getRecentProductsRequest }
