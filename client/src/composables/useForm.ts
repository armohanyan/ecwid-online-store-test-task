import type {ComputedRef, Ref, UnwrapRef} from 'vue';
import {computed, ref} from 'vue';
import {type TUseValidation, useValidation} from '@/composables/validations/useValidation';
import type {ValidationArgs} from '@vuelidate/core';
import {cloneDeep, isEqual} from 'lodash';
import type {AsyncOrSync} from "ts-essentials";

export interface FormProps<T> {
    original: T;
}

export type SubmitHandler<T> = (callback: (model: T) => AsyncOrSync<void>) => Promise<void>;

export type TUseForm<
    T extends { [key in keyof VArgs]: unknown },
    VArgs extends ValidationArgs = ValidationArgs
> = {
        data: Ref<T>,
        handleSubmit: SubmitHandler<T>,
        isFormDirty: Ref<boolean>,
        isFormTouched: ComputedRef<boolean>
    }
    & Pick<TUseValidation<T, VArgs>, 'validation' | 'isValid'>

export function useForm<
    T extends { [key in keyof VArgs]: unknown },
    VArgs extends ValidationArgs = ValidationArgs,
    P extends FormProps<T> = FormProps<T>,
>(props: P, rules: Ref<VArgs> | VArgs | UnwrapRef<VArgs> = {} as VArgs): TUseForm<T, VArgs> {
    const data: Ref<T> = ref(cloneDeep(props.original)) as Ref<T>;

    const isFormDirty: Ref<boolean> = ref(false);

    const isFormTouched: ComputedRef<boolean> = computed(() => {
        return !isEqual(data.value, props.original);
    });

    const {validation, isValid} = useValidation<T, VArgs>(rules, data);

    const handleSubmit: SubmitHandler<T> = async (callback: (model: T) => AsyncOrSync<void>) => {
        if (isValid()) {
            await callback(data.value as T);
        }

        isFormDirty.value = true;
    };

    return {
        data: data,
        validation,
        handleSubmit,
        isFormDirty,
        isFormTouched,
        isValid,
    };
}
