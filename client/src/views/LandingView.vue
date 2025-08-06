<template>
  <div class="page-wrapper">
    <section class="hero">
      <h1>Welcome to Ecwid Online Store</h1>
      <p>Fashion to feel good.</p>
    </section>

    <section id="store">
      <EcwidStore />
    </section>
  </div>
</template>

<script setup lang="ts">
import EcwidStore from '@/components/EcwidStore.vue'
</script>

<style scoped>

.hero {
  text-align: center;
  padding: 40px 0;
}
</style>