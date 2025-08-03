import { computed, ref } from 'vue';
import type { AsyncOrSync } from 'ts-essentials';

export function useLoader() {
    const loadingCounter = ref<number>(0);
    const loading = computed<boolean>(() => loadingCounter.value > 0);

    async function load<T>(loader: () => PromiseLike<T> | AsyncOrSync<T>) {
        loadingCounter.value++;

        try {
            return await loader();
        } finally {
            loadingCounter.value--;
        }
    }

    return {
        load,
        loading,
    };
}
