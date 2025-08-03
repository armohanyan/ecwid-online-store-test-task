<!-- components/EcwidStore.vue -->
<template>
  <div id="ecwid-store-container">
    <div :id="containerId"></div>
  </div>

  <RecentlyUpdatedProducts v-if="storeSettings.widgetEnabled" />
</template>

<script setup lang="ts">
import { useEcwidStore } from '@/composables/useEcwid'
import RecentlyUpdatedProducts from '@/components/RecentlyUpdatedProducts.vue'
import {useStoreSettings} from "@/composables/useStoreSettings";

const containerId = 'my-store-101560752'
useEcwidStore(containerId)

const storeSettings = useStoreSettings()
</script>

<style scoped>
#ecwid-store-container {
  margin-top: 20px;
}
</style>
