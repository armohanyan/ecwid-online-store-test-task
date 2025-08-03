/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { ref } from 'vue';
import { useStoreSettings } from '@/composables/useStoreSettings';
import { exportToCSV } from '@/utils/exportUtils';
import { useRecentProductsQuery } from "@/composables/useRecentProductsQuery";
const { widgetEnabled, defaultProductCount } = useStoreSettings();
const products = ref([]);
const selected = ref([]);
const { refetch } = useRecentProductsQuery({ limit: defaultProductCount.value });
const fetchProducts = async () => {
    const response = await refetch();
    products.value = response.data?.items || [];
};
const toggleAll = (event) => {
    const isChecked = event.target.checked;
    selected.value = isChecked ? [...products.value] : [];
};
const exportSelected = () => {
    if (!selected.value.length)
        return;
    exportToCSV(selected.value, 'selected-products.csv');
};
const navigateHome = () => {
    window.location.href = '/';
};
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ec-container" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.navigateHome) },
    ...{ class: "app-button" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
    ...{ class: "ec-heading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ec-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "ec-heading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({});
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ec-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "ec-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
    type: "checkbox",
});
(__VLS_ctx.widgetEnabled);
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ec-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
    ...{ class: "ec-label" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.select, __VLS_intrinsicElements.select)({
    value: (__VLS_ctx.defaultProductCount),
    ...{ class: "ec-select" },
});
for (const [n] of __VLS_getVForSourceType(([2, 4, 6, 8]))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.option, __VLS_intrinsicElements.option)({
        key: (n),
        value: (n),
    });
    (n);
}
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ...{ class: "ec-card" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
    ...{ class: "ec-heading" },
});
__VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
    ...{ onClick: (__VLS_ctx.fetchProducts) },
    ...{ class: "ec-btn app" },
});
if (__VLS_ctx.selected.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.exportSelected) },
        ...{ class: "ec-btn ec-btn--primary" },
    });
}
if (__VLS_ctx.products.length) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.table, __VLS_intrinsicElements.table)({
        ...{ class: "ec-table" },
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.thead, __VLS_intrinsicElements.thead)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
        ...{ onChange: (...[$event]) => {
                if (!(__VLS_ctx.products.length))
                    return;
                __VLS_ctx.toggleAll($event);
            } },
        type: "checkbox",
    });
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.th, __VLS_intrinsicElements.th)({});
    __VLS_asFunctionalElement(__VLS_intrinsicElements.tbody, __VLS_intrinsicElements.tbody)({});
    for (const [p] of __VLS_getVForSourceType((__VLS_ctx.products))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.tr, __VLS_intrinsicElements.tr)({
            key: (p.id),
        });
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        __VLS_asFunctionalElement(__VLS_intrinsicElements.input)({
            type: "checkbox",
            value: (p),
        });
        (__VLS_ctx.selected);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (p.name);
        __VLS_asFunctionalElement(__VLS_intrinsicElements.td, __VLS_intrinsicElements.td)({});
        (p.price);
        (p.currency);
    }
}
/** @type {__VLS_StyleScopedClasses['ec-container']} */ ;
/** @type {__VLS_StyleScopedClasses['app-button']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-label']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-label']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-select']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-card']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-heading']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['app']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-btn']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-btn--primary']} */ ;
/** @type {__VLS_StyleScopedClasses['ec-table']} */ ;
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            widgetEnabled: widgetEnabled,
            defaultProductCount: defaultProductCount,
            products: products,
            selected: selected,
            fetchProducts: fetchProducts,
            toggleAll: toggleAll,
            exportSelected: exportSelected,
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
//# sourceMappingURL=SettingsView.vue.js.map