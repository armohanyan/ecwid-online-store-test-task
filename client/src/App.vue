<script setup lang="ts">
import Footer from '@/components/app/Footer.vue'
import Header from '@/components/app/Header.vue'
</script>

<template>
  <div>
    <Header />

    <router-view />

    <Footer />
  </div>
</template>

<style scoped></style>
