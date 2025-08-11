<template>
  <div class="setting-container">
    <div class="settings-page">
      <div class="settings-page__header">
        <div class="settings-page__titles settings-page__titles--left">
          <h1 class="settings-page__title">Settings</h1>
          <div class="settings-page__subtitle">
            On this settings page, you can enable or disable the widget, set how many products the widget should display on the cart page, and export your product catalog in CSV or XLSX format.          </div>
        </div>
      </div>

      <!-- Widget Settings -->
      <div class="named-area">
        <div class="named-area__header">
          <div class="named-area__titles">
            <div class="named-area__title">Widget Settings</div>
            <div class="named-area__subtitle">
              Settings for Recently added products
            </div>
          </div>
        </div>
        <div class="named-area__body">
          <div class="a-card a-card--normal">
            <div class="a-card__paddings">
              <div class="form-area">
                <div class="form-area__content">
                  <div class="fieldsets-batch">
                    <div class="fieldset">
                      <div class="fieldset__title">Enable Recently Updated Products Widget</div>
                      <label class="checkbox tiny">
                        <input type="checkbox" v-model="settings.widgetEnabled" name="widgetEnabled" />
                        <div data-on="enabled" data-off="disabled"><div></div></div>
                      </label>
                    </div>
                  </div>
                </div>

                <div class="form-area__content">
                  <div class="fieldsets-batch">
                    <div class="fieldset fieldset--select fieldset--no-label">
                      <div class="fieldset__title">Default number of products:</div>
                      <div>
                        <div>
                          <div class="field field--medium field--filled">
                            <label class="field__label"></label>
                            <select v-model="settings.defaultProductCount" class="field__select" tabindex="1">
                              <option v-for="n in [2, 4, 6, 8]" :key="n" :value="n">{{ n }}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="form-area__action">
                  <button type="button" class="btn btn-primary btn-medium" tabindex="5" @click="saveSettings">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Export Products -->
      <div class="named-area">
        <div class="named-area__header">
          <div class="named-area__titles">
            <div class="named-area__title">Export Products</div>
            <div class="named-area__subtitle">
              An option to export the store’s product catalog for backup or external use.
            </div>
        </div>
        </div>
        <div class="named-area__body">
          <div class="a-card a-card--normal">
            <div class="a-card__paddings">
              <div class="ec-form-control gap">
                <template v-if="selected.length">
                  <button class="btn btn-primary" @click="exportCSV">Export CSV</button>
                  <button class="btn btn-primary" @click="exportXLSX">Export XLSX</button>
                </template>
              </div>

              <div v-if="products.length" class="flex-table mt-2">
                <div class="flex-table__head">
                  <div class="flex-table__col flex-table__col--align-left">
                    <input :checked="allSelected" type="checkbox" @change="toggleAll($event)" />
                  </div>
                  <div class="flex-table__col flex-table__col--align-center">Name</div>
                  <div class="flex-table__col flex-table__col--align-right">Price</div>
                </div>

                <div v-for="p in products" :key="p.id" class="flex-table__row">
                  <div class="flex-table__col flex-table__col--align-left">
                    <input v-model="selected" type="checkbox" :value="p.id" />
                  </div>
                  <div class="flex-table__col flex-table__col--align-center">{{ p.name }}</div>
                  <div class="flex-table__col flex-table__col--align-right">{{ p.price }} {{ p.currency }}</div>
                </div>

                <PaginationControls
                    :currentPage="currentPage"
                    :totalPages="totalPages"
                    :totalItems="totalItems"
                    :itemsPerPage="numberOfRecentProducts"
                    @update:currentPage="(value) => {
                      if (value * numberOfRecentProducts <= totalItems) {
                        currentPage = value
                        selected = []
                      }
                    }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useStoreSettings } from '@/composables/useStoreSettings'
import { useRecentProductsQuery } from '@/composables/useRecentProductsQuery'
import { IProduct } from '@/types/product'
import PaginationControls from '@/components/app/PaginationControls.vue'
import {BASE_API_URL_LOCAL} from "@/config";

const { widgetEnabled, defaultProductCount } = useStoreSettings()

const currentPage = ref(1)
const totalItems = ref(0)
const totalPages = ref(1)
const settings = ref({
  widgetEnabled: widgetEnabled.value,
  defaultProductCount: defaultProductCount.value
})

const numberOfRecentProducts = ref(3)
const params = ref({
  limit: numberOfRecentProducts.value,
  offset: 0,
  sortBy: 'UPDATED_TIME_DESC',
})

const products = ref<IProduct[]>([])
const selected = ref<number[]>([])

const { refetch } = useRecentProductsQuery(params.value)

watch([numberOfRecentProducts, currentPage], async () => {
  params.value.limit = numberOfRecentProducts.value
  params.value.offset = (currentPage.value - 1) * numberOfRecentProducts.value

  const result = await refetch()

  if (result?.data?.items) {
    products.value = result.data.items
    totalItems.value = result.data.total || 0
    totalPages.value = Math.ceil(totalItems.value / numberOfRecentProducts.value)
  }
})

const allSelected = computed(() => selected.value.length === products.value.length)

const fetchProducts = async () => {
  const response = await refetch()

  products.value = response?.data?.items || []
  totalItems.value = response?.data?.total || 0
  totalPages.value = Math.ceil(totalItems.value / numberOfRecentProducts.value)
}

const toggleAll = (event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked

  selected.value = isChecked ? [...products.value.map(product => product.id)] : []
}

const exportCSV = () => {
  if (!selected.value.length) return
  const selectedIds = selected.value.join(',');

  const url = `${BASE_API_URL_LOCAL}/export/csv?ids=${encodeURIComponent(selectedIds)}`;

  window.open(url, '_blank');
}

const exportXLSX = () => {
  if (!selected.value.length) return

  const selectedIds = selected.value.join(',');
  const url = `${BASE_API_URL_LOCAL}/export/xlsx?ids=${encodeURIComponent(selectedIds)}`;

  window.open(url, '_blank');
}

const saveSettings = () => {
  widgetEnabled.value = settings.value.widgetEnabled
  defaultProductCount.value = settings.value.defaultProductCount
}

onMounted(() => {
  fetchProducts()
})
</script>

<style scoped>
.mt-2 {
  margin-top: 20px;
}

.gap {
  display: flex;
  gap: 10px;
}

.settings-page {
  margin-top: 20px;
  padding: 20px;
}

.settings-page__header {
  padding: 0 !important;
}
</style>