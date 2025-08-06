import { ref } from 'vue'

const ecwidloaded = ref(false)

export function useEcwidLoader() {
  const waitForEcwidReady = (callback: () => void) => {
    const check = () => {
      if (window.Ecwid?.OnPageLoad) {
        window.Ecwid.OnPageLoad.add(callback)
      } else {
        setTimeout(check, 300)
      }
    }

    check()
  }

  const checkIfEcwidLoaded = () => {
    const check = () => {
      if (window.Ecwid?.OnPageLoad) {
        ecwidloaded.value = true
      } else {
        ecwidloaded.value = false

        setTimeout(check, 300)
      }
    }

    check()
  }

  return {
    waitForEcwidReady,
    checkIfEcwidLoaded,
    ecwidloaded
  }
}
