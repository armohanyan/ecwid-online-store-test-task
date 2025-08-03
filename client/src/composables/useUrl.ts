import type { Optional } from '@ods/framework/types';
import { isObject } from 'lodash-es';

export function withQueryParams(url: string, params: Optional<Record<string, unknown>>) {
    if (!params) {
        return url;
    }

    return Object.keys(params).reduce((accumulator, key, index) => {
        const value = params[key];

        const separator = index === 0 ? '?' : '&';

        if (!value) {
            return accumulator;
        }

        if (Array.isArray(value)) {
            if (!value.length) {
                return accumulator;
            }

            return accumulator + `${separator}${key}=${value.join(',')}`;
        }

        if (isObject(value)) {
            Object.keys(value).forEach((subKey, index) => {
                const subValue = (value as Record<string, unknown>)[subKey as string];

                if (!subValue) {
                    return;
                }

                accumulator += `${index === 0 ? separator : '&'}${key}[${subKey}]=${subValue}`;
            });
        }

        if (!isObject(value)) {
            return accumulator + `${separator}${key}=${value}`;
        }

        return accumulator;
    }, url);
}

export function withSingleArrayParam(url: string, values: string[], key: string = 'ids') {
    return withQueryParams(url, {
        [key]: values.join(','),
    } as Record<string, never>);
}
