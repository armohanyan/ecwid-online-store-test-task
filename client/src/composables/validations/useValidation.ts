import type {Ref, UnwrapRef} from 'vue';
import {isRef, ref} from 'vue';
import type {ExtractState, Validation, ValidationArgs} from '@vuelidate/core';
import useValidate from '@vuelidate/core';
import {get} from 'lodash-es';

export type TUseValidation<
    T extends { [key in keyof VArgs]: unknown },
    VArgs extends ValidationArgs = ValidationArgs
> = {
    validation: Ref<Validation<VArgs, T>>;
    isValid: (path?: string) => boolean;
    _rules: Ref<VArgs>;
};

export function useValidation<
    T extends { [key in keyof VArgs]: unknown },
    VArgs extends ValidationArgs = ValidationArgs,
    EState extends ExtractState<VArgs> = ExtractState<VArgs>,
>(
    rules: VArgs | Ref<VArgs> | UnwrapRef<VArgs>,
    state: Ref,
    options = {}
): TUseValidation<T, VArgs> {
    const _rules = (isRef(rules) ? rules : ref<VArgs>(rules as VArgs)) as Ref<VArgs>;

    const v$ = useValidate<T, VArgs, EState>(_rules, state, options);

    const isValid = (path?: string) => {
        let val = v$.value;
        if (path) {
            val = get(v$.value, path);
        }

        val.$touch();
        return !val.$invalid;
    };

    return {
        validation: v$,
        isValid,
        _rules,
    };
}

export * from './rules';
