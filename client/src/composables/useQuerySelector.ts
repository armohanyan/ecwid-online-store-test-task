import { useQuery } from '@tanstack/vue-query';
import { computed, ref, type Ref } from 'vue';

const SLATE_TIME = 1000 * 60 * 2;
const DEFAULT_LABEL_KEY = 'name';
type DefaultLabelKey = typeof DEFAULT_LABEL_KEY;

export interface QueryBaseSelectorOptions<T, K> {
    queryKey: string[];
    queryFn: () => Promise<T[]>;
    caching?: boolean;
    labelKey?: K;
}

export interface QuerySingleSelectorOptions<T, K> extends QueryBaseSelectorOptions<T, K> {
    multiple: false;
    selected: Ref<string>;
}

export interface QueryMultipleSelectorOptions<T, K> extends QueryBaseSelectorOptions<T, K> {
    multiple: true;
    selected: Ref<string[]>;
}

export type QuerySingleSelector<T, K = DefaultLabelKey> =
    | QuerySingleSelectorOptions<T, K>
    | QueryMultipleSelectorOptions<T, K>;

export function useQuerySelector<
    T extends {
        id: string;
    } & Record<K, string>,
    K extends string = DefaultLabelKey,
>(options: QuerySingleSelector<T, K>) {
    const {
        queryKey,
        queryFn,
        selected = ref(options.multiple ? ([] as string[]) : ('' as string)),
        caching = true,
        multiple = false,
        labelKey = DEFAULT_LABEL_KEY,
    } = options;

    const { isPending, data } = useQuery<T[]>({
        queryKey,
        queryFn,
        staleTime: caching ? SLATE_TIME : 0,
    });

    const selectorLabel = computed(() => {
        if (!data.value) {
            return '';
        }

        if (!multiple) {
            const selectedModel = data.value.find((item) => item.id === selected.value);

            if (selectedModel) {
                return selectedModel[labelKey as keyof T] ?? '';
            }
        }

        const selectedModels = data.value.filter((item: T) => {
            if (multiple) {
                return (selected.value as string[]).includes(item.id);
            } else {
                return item.id === selected.value;
            }
        });

        if (selectedModels.length) {
            return selectedModels.map((item) => item[labelKey as keyof T] ?? '').join(', ');
        }

        return '';
    });

    return {
        isPending,
        data,
        selectorLabel,
    } as {
        isPending: Ref<boolean>;
        data: Ref<T[]>;
        selectorLabel: Ref<string>;
    };
}
