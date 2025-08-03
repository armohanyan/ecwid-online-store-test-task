<template>
  <div class="ec-container">
    <router-link to="/">Home</router-link>

    <h1 class="ec-heading">Widget Settings</h1>

    <!-- Feature Description -->
    <div class="ec-card">
      <h3 class="ec-heading">Feature Description</h3>
      <p>This widget shows the most recently updated products on the cart page. Customers can add them to cart directly.</p>
    </div>

    <!-- Enable/Disable Toggle -->
    <div class="ec-card">
      <label class="ec-label">
        <input type="checkbox" v-model="widgetEnabled" />
        Enable Recently Updated Products Widget
      </label>
    </div>

    <!-- Default Product Count -->
    <div class="ec-card">
      <label class="ec-label">Default number of products:</label>
      <select v-model="defaultProductCount" class="ec-select">
        <option v-for="n in [2, 4, 6, 8]" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>

    <!-- Export Catalog -->
    <div class="ec-card">
      <h3 class="ec-heading">Export Catalog</h3>
      <button class="ec-btn" @click="fetchProducts">Load Products</button>
      <button v-if="selected.length" class="ec-btn ec-btn--primary" @click="exportSelected">Export Selected Products</button>

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
import axios from 'axios';
import { exportToCSV } from '@/utils/exportUtils';

const { widgetEnabled, defaultProductCount } = useStoreSettings();

const products = ref<any[]>([]);
const selected = ref<any[]>([]);

const API_BASE = 'https://app.ecwid.com/api/v3/101560752/products';
const TOKEN = 'public_ie55a1cQU472c1GBmeBqAVpL1ks3LFpu';

async function fetchProducts() {
  const res = await axios.get(API_BASE, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    }
  });

  products.value = res.items;
}

function toggleAll(event: Event) {
  const isChecked = (event.target as HTMLInputElement).checked;
  selected.value = isChecked ? [...products.value] : [];
}

function exportSelected() {
  if (!selected.value.length) return;
  exportToCSV(selected.value, 'selected-products.csv');
}
</script>

<style scoped>
.ec-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 16px 0;
  border-radius: 4px;
}
</style>