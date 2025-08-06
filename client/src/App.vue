<script setup lang="ts">
import Footer from '@/components/app/Footer.vue'
import Header from '@/components/app/Header.vue'
import { useEcwidLoader } from '@/composables/useEcwidLoader'

const route = useRoute()

const {ecwidloaded, checkIfEcwidLoaded} = useEcwidLoader()
checkIfEcwidLoaded()

const routeInLandingView = () => {
  return route.path === '/'
}
</script>

<template>
  <div>
    <Header v-if="!routeInLandingView || ecwidloaded" />

    <router-view />

    <Footer v-if="!routeInLandingView || ecwidloaded" />
  </div>
</template>

<style scoped></style>
