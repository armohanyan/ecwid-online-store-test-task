<template>
  <div>
    <CardContainer>
      <h2 class="text-big">Feature Description</h2>

      <p class="text-default">
        This widget shows the most recently updated products on the cart page.
        Customers can add them to cart directly.
      </p>
    </CardContainer>

    <CardContainer>
      <div class="custom-checkbox">
        <label>
          <input v-model="widgetEnabled" type="checkbox" class="custom-checkbox__input">
          <span class="custom-checkbox__label"></span>
          <span class="custom-checkbox__text">Enable Recently Updated Products Widget</span>
        </label>
      </div>
    </CardContainer>

    <CardContainer>
      <div class="fieldset fieldset--select fieldset--no-label">
        <div class="fieldset__title">Default number of products:</div>
        <div class="field field--medium field--filled">
          <label class="field__label"></label>
          <select class="field__select" tabindex="1">
            <option v-for="n in [2, 4, 6, 8]" :key="n" :value="n">{{ n }}</option>
          </select>
        </div>
      </div>
    </CardContainer>

    <CardContainer>
      <h2 class="ec-heading">Export Catalog</h2>

      <div class="ec-form-control gap">
        <template v-if="selected.length">
          <button class="btn btn-primary" @click="exportCSV">Export CSV</button>
          <button class="btn btn-primary" @click="exportXLSX">Export XLSX</button>
        </template>
      </div>

      <div v-if="products.length" class="flex-table mt-2 w-70">
        <div class="flex-table__head">
          <div class="flex-table__col flex-table__col--align-left">
            <input type="checkbox" @change="toggleAll($event)" />
          </div>
          <div class="flex-table__col flex-table__col--align-center">Name</div>
          <div class="flex-table__col flex-table__col--align-right">Price</div>
        </div>

        <div v-for="p in products" :key="p.id" class="flex-table__row">
          <div class="flex-table__col flex-table__col--align-left">
            <input v-model="selected" type="checkbox" :value="p" />
          </div>
          <div class="flex-table__col flex-table__col--align-center">{{ p.name }}</div>
          <div class="flex-table__col flex-table__col--align-right">{{ p.price }} {{ p.currency }}</div>
        </div>
      </div>
    </CardContainer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useStoreSettings } from '@/composables/useStoreSettings'
import { exportToCSV, exportToXLSX } from '@/utils/exportUtils'
import { useRecentProductsQuery } from '@/composables/useRecentProductsQuery'
import { IProduct } from '@/types/product'
import CardContainer from '@/components/app/CardContainer.vue'

const { widgetEnabled, defaultProductCount } = useStoreSettings()

const products = ref<IProduct[]>([])
const selected = ref<IProduct[]>([])
const { refetch } = useRecentProductsQuery({ limit: defaultProductCount.value, sortBy: 'UPDATED_TIME_DESC' })

const fetchProducts = async () => {
  const response = await refetch()

  products.value = response.data?.items || []
}

const toggleAll = (event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked

  selected.value = isChecked ? [...products.value] : []
}

const exportCSV = () => {
  if (!selected.value.length) return

  exportToCSV(selected.value, 'selected-products.csv')
}

const exportXLSX = () => {
  if (!selected.value.length) return

  exportToXLSX(selected.value, 'selected-products.xlsx')
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.w-70 {
  width: 70%;
}

.mt-2 {
  margin-top: 20px;
}

.gap {
  display: flex;
  gap: 10px;
}

</style>