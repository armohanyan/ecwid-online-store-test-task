<template>
  <div>
    <button @click="navigateHome" class="app-button">Settings</button>

    <EcwidStore />
  </div>
</template>

<script setup lang="ts">
import EcwidStore from '@/components/EcwidStore.vue'
import router from "@/router";

const navigateHome = () => {
  router.replace('/settings')
}
</script>
