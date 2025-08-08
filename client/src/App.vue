<script setup lang="ts">
import Footer from '@/components/app/Footer.vue'
import Header from '@/components/app/Header.vue'
import { useEcwidLoader } from '@/composables/useEcwidLoader'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const { ecwidloaded, checkIfEcwidLoaded } = useEcwidLoader()
checkIfEcwidLoaded()

const routeInLandingView = () => {
  return route.path === '/'
}

const showHeaderAndFooter = computed(() => {
  if (!routeInLandingView()) return true

  return ecwidloaded.value
})

</script>

<template>
  <div>
    <Header v-if="showHeaderAndFooter" />

    <div>
      <RouterView />
    </div>

    <Footer v-if="showHeaderAndFooter" />
  </div>
</template>

<style scoped></style>
