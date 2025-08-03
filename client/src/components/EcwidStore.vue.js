/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { useEcwidStore } from '@/composables/useEcwid';
import RecentlyUpdatedProducts from '@/components/RecentlyUpdatedProducts.vue';
import { useStoreSettings } from "@/composables/useStoreSettings";
const containerId = 'my-store-101560752';
useEcwidStore(containerId);
const storeSettings = useStoreSettings();
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "ecwid-store-container",
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: (__VLS_ctx.containerId),
});
if (__VLS_ctx.storeSettings.widgetEnabled) {
    /** @type {[typeof RecentlyUpdatedProducts, ]} */ ;
    // @ts-ignore
    const __VLS_0 = __VLS_asFunctionalComponent(RecentlyUpdatedProducts, new RecentlyUpdatedProducts({}));
    const __VLS_1 = __VLS_0({}, ...__VLS_functionalComponentArgsRest(__VLS_0));
}
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            RecentlyUpdatedProducts: RecentlyUpdatedProducts,
            containerId: containerId,
            storeSettings: storeSettings,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=EcwidStore.vue.js.map