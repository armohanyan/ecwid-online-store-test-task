import axios from 'axios'
import { BASE_API_URL, STORE_ID, STORE_TOKEN } from '@/config'

const instance = axios.create({
  timeout: 10000,
  baseURL: BASE_API_URL + STORE_ID,
})

instance.interceptors.request.use(
  (config) => {
    const token = STORE_TOKEN

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  ({ data }) => data,
  ({ message, response }) => Promise.reject(response ? response.data : message)
)

export default instance
