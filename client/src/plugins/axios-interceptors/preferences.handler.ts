import axios, { type AxiosInstance } from 'axios';
import { isString } from 'lodash-es';

export function setBaseURL(url: string) {
    axios.defaults.baseURL = url;
}

export function updateClientHeaders(
    axiosClient: AxiosInstance,
    accessToken: string = '',
    refreshToken?: string,
    idToken?: string
) {
    if (accessToken) {
        axiosClient.defaults.headers['authorization'] = 'Bearer ' + accessToken;
    } else {
        axiosClient.defaults.headers['authorization'] = '';
    }

    if (isString(refreshToken)) {
        axiosClient.defaults.headers['ods-refresh-token'] = refreshToken;
    }

    if (isString(idToken)) {
        axiosClient.defaults.headers['ods-id-token'] = idToken;
    }
}

export function updateHeaders(
    accessToken: string = '',
    refreshToken?: string,
    idToken?: string
) {
    updateClientHeaders(axios, accessToken, refreshToken, idToken);
}