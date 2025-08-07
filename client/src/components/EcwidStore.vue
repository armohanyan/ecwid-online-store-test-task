<template>
  <div id="ecwid-store-container">
    <div :id="containerId"></div>
  </div>

  <RecentlyUpdatedProducts v-if="storeSettings.widgetEnabled" />
</template>

<script setup lang="ts">
import { useEcwidStore } from '@/composables/useEcwid'
import {useStoreSettings} from "@/composables/useStoreSettings";
import {STORE_ID} from '@/config'
import RecentlyUpdatedProducts from '@/components/RecentlyUpdatedProducts.vue'

const containerId = 'my-store-' + STORE_ID

useEcwidStore(containerId)

const storeSettings = useStoreSettings()
</script>

<style scoped>
#ecwid-store-container {
  margin-top: 20px;
}
</style>
