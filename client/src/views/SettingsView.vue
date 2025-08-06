<template>
  <div class="ec-container">

    <!-- Export Section -->
    <div class="a-card a-card--compact">
      <div class="a-card__paddings">
        <h2 class="ec-heading">Feature Description</h2>

        <p class="ec-text">
          This widget shows the most recently updated products on the cart page.
          Customers can add them to cart directly.
        </p>
      </div>
    </div>

    <div class="a-card a-card--compact">
      <div class="a-card__paddings">
        <div class="custom-checkbox">
          <label>
            <input v-model="widgetEnabled"  type="checkbox" value="on" tabindex="0" class="custom-checkbox__input">
            <span class="custom-checkbox__label"></span>
            <span class="custom-checkbox__text">Enable Recently Updated Products Widget</span>
          </label>
        </div>
      </div>
    </div>

    <div class="a-card a-card--compact">
      <div class="a-card__paddings">
        <label class="ec-label">Default number of products:</label>
        <select v-model="defaultProductCount" class="ec-select">
          <option v-for="n in [2, 4, 6, 8]" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
    </div>


      <div class="a-card a-card--compact">
      <div class="a-card__paddings">
        <h2 class="ec-heading">Export Catalog</h2>

        <div class="ec-form-control ec-mb--2">
          <button class="btn btn-default" @click="fetchProducts">Load Products</button>

          <template v-if="selected.length">
            <button class="ec-btn ec-btn--primary" @click="exportCSV">Export CSV</button>
            <button class="ec-btn ec-btn--primary" @click="exportXLSX">Export XLSX</button>
          </template>
        </div>

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

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useStoreSettings } from '@/composables/useStoreSettings';
import { exportToCSV, exportToXLSX } from '@/utils/exportUtils';
import {useRecentProductsQuery} from "@/composables/useRecentProductsQuery";
import { IProduct } from '@/types/product'

const { widgetEnabled, defaultProductCount } = useStoreSettings();

const products = ref<IProduct[]>([]);
const selected = ref<IProduct[]>([]);
const { refetch } = useRecentProductsQuery({ limit: defaultProductCount.value, sortBy: 'UPDATED_TIME_DESC' })

const fetchProducts = async () => {
  const response = await refetch();

  products.value = response.data?.items || []
}

const toggleAll = (event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked;
  selected.value = isChecked ? [...products.value] : [];
}

const exportCSV = () => {
  if (!selected.value.length) return;

  exportToCSV(selected.value, 'selected-products.csv');
}

const exportXLSX = () => {
  if (!selected.value.length) return;

  exportToXLSX(selected.value, 'selected-products.xlsx');
}

const navigateHome = () => {
  // todo: not good practice but as we use embed store this need to reload the js
  window.location.href = '/'
}

</script>

<style scoped>
</style>