import { ref, watch } from 'vue'

const widgetEnabled = ref(localStorage.getItem('widgetEnabled') === 'true')
const defaultProductCount = ref(Number(localStorage.getItem('defaultProductCount') || 4))

watch(widgetEnabled, (val) => {
  localStorage.setItem('widgetEnabled', String(val))
})

watch(defaultProductCount, (val) => {
  localStorage.setItem('defaultProductCount', String(val))
})

export function useStoreSettings() {
  return {
    widgetEnabled,
    defaultProductCount,
  }
}
