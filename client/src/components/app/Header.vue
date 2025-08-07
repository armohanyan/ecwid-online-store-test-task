<template>
  <header class="store-header">
    <a href="/">
      <img src="/logo.png" alt="My Store" class="logo" />
    </a>
    <nav class="nav">
      <button class="btn btn-primary" @click="navigateToHome">Home</button>
      <button class="btn btn-default" @click="navigateSettings">Settings</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import router from '@/router'

const navigateSettings = () => {
  router.replace('/settings')
}

const navigateToHome = () => {
  router.push('/')
}
</script>

<style scoped>

.store-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  height: 40px;
}

.nav {
  display: flex;
  gap: 12px;
  align-items: center;
}

</style>