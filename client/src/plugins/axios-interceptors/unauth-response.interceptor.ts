import type { ObjectPlugin } from 'vue';
import axios, {
    type AxiosError,
    type AxiosResponse,
    isAxiosError,
} from 'axios';

export const unauthorizedResponseInterceptor: ObjectPlugin = {
    install: () => {
        axios.interceptors.response.use(onSuccessfulResponse, onFailedResponse);
    },
};

function onSuccessfulResponse(response: AxiosResponse) {
    return response;
}

async function onFailedResponse(error: AxiosError | unknown) {
    if (!isAxiosError(error)) {
        return Promise.reject(error);
    }
}
