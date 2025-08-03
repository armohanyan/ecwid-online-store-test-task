
export const clientConfig = Object.freeze({
    forms: {
        default: {
            userPassword: import.meta.env.VITE_DEFAULT_USER_PASSWORD ?? '',
        }
    }
})