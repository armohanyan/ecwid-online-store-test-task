import type { ObjectPlugin } from 'vue';
import axios from 'axios';

export const globalAxiosInterceptor: ObjectPlugin = {
    install: () => {

        axios.interceptors.response.use(
            function (response) {
                return response.data
            },
            function (error) {
                return Promise.reject(error);
            }
        );
    },
};
