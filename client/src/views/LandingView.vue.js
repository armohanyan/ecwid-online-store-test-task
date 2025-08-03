/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import EcwidStore from '@/components/EcwidStore.vue';
import router from "@/router";
const navigateHome = () => {
    router.push('/settings');
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.navigateHome) },
    ...{ class: "app-button" },
});
/** @type {[typeof EcwidStore, ]} */ ;
// @ts-ignore
const __VLS_0 = __VLS_asFunctionalComponent(EcwidStore, new EcwidStore({}));
const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
/** @type {__VLS_StyleScopedClasses['app-button']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            EcwidStore: EcwidStore,
            navigateHome: navigateHome,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=LandingView.vue.js.map