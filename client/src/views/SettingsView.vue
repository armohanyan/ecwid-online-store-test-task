<template>
  <div class="ec-container">
    <button @click="navigateHome" class="app-button">Home</button>

    <h1 class="ec-heading">Widget Settings</h1>

    <div class="ec-card">
      <h3 class="ec-heading">Feature Description</h3>
      <p>This widget shows the most recently updated products on the cart page. Customers can add them to cart directly.</p>
    </div>

    <div class="ec-card">
      <label class="ec-label">
        <input type="checkbox" v-model="widgetEnabled" />
        Enable Recently Updated Products Widget
      </label>
    </div>

    <div class="ec-card">
      <label class="ec-label">Default number of products:</label>
      <select v-model="defaultProductCount" class="ec-select">
        <option v-for="n in [2, 4, 6, 8]" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>

    <div class="ec-card">
      <h3 class="ec-heading">Export Catalog</h3>
      <button class="ec-btn app" @click="fetchProducts">Load Products</button>

      <button
        v-if="selected.length"
        class="ec-btn ec-btn--primary"
        @click="exportSelected">
        Export Selected Products
      </button>

      <table v-if="products.length" class="ec-table">
        <thead>
        <tr>
          <th><input type="checkbox" @change="toggleAll($event)" /></th>
          <th>Name</th>
          <th>Price</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="p in products" :key="p.id">
          <td><input type="checkbox" v-model="selected" :value="p" /></td>
          <td>{{ p.name }}</td>
          <td>{{ p.price }} {{ p.currency }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStoreSettings } from '@/composables/useStoreSettings';
import { exportToCSV } from '@/utils/exportUtils';
import {useRecentProductsQuery} from "@/composables/useRecentProductsQuery";
import { IProduct } from '@/types/product'

const { widgetEnabled, defaultProductCount } = useStoreSettings();

const products = ref<IProduct[]>([]);
const selected = ref<IProduct[]>([]);
const { refetch } = useRecentProductsQuery({ limit: defaultProductCount.value })

const fetchProducts = async () => {
  const response = await refetch();

  products.value = response.data?.items || []
}

const toggleAll = (event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked;
  selected.value = isChecked ? [...products.value] : [];
}

const exportSelected = () => {
  if (!selected.value.length) return;

  exportToCSV(selected.value, 'selected-products.csv');
}

const navigateHome = () => {
  window.location.href = '/'
}

</script>

<style scoped>
</style>