/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
import { onMounted, ref } from 'vue';
import { useRecentProductsQuery } from '@/composables/useRecentProductsQuery';
import { useEcwidLoader } from "@/composables/useEcwidLoader";
import { useStoreSettings } from "@/composables/useStoreSettings";
const storeSettings = useStoreSettings();
const ecwidLoader = useEcwidLoader();
const numberOfRecentProducts = ref(storeSettings.defaultProductCount.value);
const params = ref({ limit: numberOfRecentProducts.value });
const { refetch } = useRecentProductsQuery(params.value);
function createWidget(products) {
    const containerId = 'recently-updated-products-widget';
    let existing = document.getElementById(containerId);
    if (existing)
        existing.remove();
    const container = document.createElement('div');
    container.id = containerId;
    container.style.padding = '16px';
    container.style.borderTop = '1px solid #ccc';
    const title = document.createElement('h3');
    title.textContent = 'Recently Updated Products';
    title.style.marginBottom = '12px';
    container.appendChild(title);
    const dropdown = document.createElement('select');
    dropdown.innerHTML = [2, 4, 6, 8, 10].map(n => `<option value="${n}" ${n === numberOfRecentProducts.value ? 'selected' : ''}>Show ${n}</option>`).join('');
    dropdown.onchange = async (e) => {
        const target = e.target;
        numberOfRecentProducts.value = parseInt(target.value);
        params.value = { limit: numberOfRecentProducts.value };
        const result = await refetch();
        if (result.data?.items) {
            createWidget(result.data.items);
        }
    };
    container.appendChild(dropdown);
    const grid = document.createElement('div');
    grid.style.display = 'grid';
    grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))';
    grid.style.gap = '12px';
    grid.style.marginTop = '12px';
    for (const product of products) {
        const card = document.createElement('div');
        card.style.border = '1px solid #eee';
        card.style.padding = '8px';
        card.style.textAlign = 'center';
        card.style.borderRadius = '6px';
        card.style.background = '#fff';
        const img = document.createElement('img');
        img.src = product.thumbnailUrl || '';
        img.style.width = '100%';
        img.style.objectFit = 'cover';
        img.style.cursor = 'pointer';
        img.onclick = () => window.location.href = product.url;
        card.appendChild(img);
        const name = document.createElement('div');
        name.textContent = product.name;
        name.style.cursor = 'pointer';
        name.style.margin = '6px 0';
        name.onclick = () => window.location.href = product.url;
        card.appendChild(name);
        const buyBtn = document.createElement('button');
        buyBtn.textContent = 'Buy now';
        buyBtn.onclick = () => {
            window.Ecwid?.Cart?.addProduct(product.id);
        };
        buyBtn.style.padding = '6px 12px';
        buyBtn.style.border = 'none';
        buyBtn.style.background = '#3c77a4';
        buyBtn.style.color = '#fff';
        buyBtn.style.cursor = 'pointer';
        buyBtn.style.borderRadius = '4px';
        card.appendChild(buyBtn);
        grid.appendChild(card);
    }
    container.appendChild(grid);
    const target = document.querySelector('.ec-cart__body') || document.body;
    target.appendChild(container);
}
onMounted(() => {
    if (!storeSettings.widgetEnabled.value)
        return;
    ecwidLoader.waitForEcwidReady(() => {
        window.Ecwid?.OnPageLoaded.add(async (page) => {
            if (page.type !== 'CART')
                return;
            const result = await refetch();
            createWidget(result?.data?.items || []);
        });
    });
});
debugger; /* PartiallyEnd: #3632/scriptSetup.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    id: "recently-updated-products-widget",
});
var __VLS_dollars;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=RecentlyUpdatedProducts.vue.js.map