import axios from 'axios'

const instance = axios.create({
    timeout: 10000,
    baseURL: import.meta.env.VITE_BASE_API_URL + import.meta.env.VITE_STORE_ID
})

instance.interceptors.request.use(
    (config) => {
        const token = import.meta.env.VITE_TOKEN

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    error => Promise.reject(error)
)

instance.interceptors.response.use(
    ({ data }) => data,
    ({ message, response }) => Promise.reject(response ? response.data : message)
)

export default instance