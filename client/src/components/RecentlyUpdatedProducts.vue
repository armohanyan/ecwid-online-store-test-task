<template>

  <Teleport v-if="isCartPage && targetReady" to=".ec-cart__body">
    <div>
      <h3 class="text-big">Recently Updated Products</h3>

      <select v-model="numberOfRecentProducts" class="field__select" tabindex="1">
        <option v-for="n in [2, 4, 6, 8]" :key="n" :value="n">Show {{ n }}</option>
      </select>

      <div
        class="grid__products grid__products--large-items">
        <div v-for="product in products"
             :key="product.id" class="grid-product">
          <div class="grid-product__wrap" >
            <div class="grid-product__wrap-inner">

              <img
                :src="product.thumbnailUrl"
                :alt="product.name"
                @click="goToProduct(product)"
              />

              <div class="grid-product__title-inner" @click="goToProduct(product)">
                {{ product.name }}
              </div>

              <div class="grid-product__price-amount">
                <div class="grid-product__price-value ec-price-item">${{ product.price }}</div>
              </div>

              <button class="buy-button" @click="buyNow(product.id)">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRecentProductsQuery } from '@/composables/useRecentProductsQuery'
import { useEcwidLoader } from '@/composables/useEcwidLoader'
import { useStoreSettings } from '@/composables/useStoreSettings'
import { IProduct } from '@/types/product'

const storeSettings = useStoreSettings()
const ecwidLoader = useEcwidLoader()

const numberOfRecentProducts = ref(2)
const params = ref({
  limit: numberOfRecentProducts.value,
  sortBy: 'UPDATED_TIME_DESC',
})

const { refetch } = useRecentProductsQuery(params.value)
const products = ref<IProduct[]>([])
const isCartPage = ref(false)
const targetReady = ref(false)

watch(numberOfRecentProducts, async (newVal) => {
  params.value.limit = newVal
  const result = await refetch()

  if (result?.data?.items) {
    products.value = result.data.items
  }
})

function goToProduct(product: IProduct) {
  const slug = product.url.split('/').at(-1)
  window.location.href = window.location.hash + slug
}

function buyNow(productId: number) {
  window.Ecwid?.Cart?.addProduct(productId)
}

function waitForCartBody(): Promise<void> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const target = document.querySelector('.ec-cart__body')

      if (target) {
        clearInterval(interval)
        targetReady.value = true
        resolve()
      }
    }, 100)
  })
}

onMounted(() => {
  if (!storeSettings.widgetEnabled.value) return

  ecwidLoader.waitForEcwidReady(() => {
    window.Ecwid?.OnPageLoaded.add(async (page: { type: string }) => {
      isCartPage.value = page.type === 'CART'

      if (!isCartPage.value) return

      await waitForCartBody()

      const result = await refetch()
      products.value = result?.data?.items || []
    })
  })
})
</script>
<style scoped>
.grid-product__wrap-inner {
  width: 250px !important;
  min-height: 600px !important;
}

.ec-price-item {
  font-weight: bold !important;
}

.buy-button {
  padding: 10px 20px !important;
  background-color: #275ce0 !important;
  color: #fff !important;
  border: 0 solid transparent;
  outline: 0;
  text-align: center;
  cursor: pointer;
  font-weight: 500;
  border-radius: 6px;
}
</style>