import { onMounted, onUnmounted } from 'vue'

export function useEcwidStore(containerId: string) {
  const render = () => {
    window.xProductBrowser?.(
      'categoriesPerRow=3',
      'views=grid(20,3) list(60) table(60)',
      'categoryView=grid',
      'searchView=list',
      'id=my-store-101560752'
    )
  }

  onMounted(() => {
    if (document.getElementById('ecwid-script')) {
      render()
      return
    }

    const script = document.createElement('script')
    script.src = 'https://app.ecwid.com/script.js?101560752&data_platform=code&data_date=2020-05-26'
    script.async = true
    script.id = 'ecwid-script'

    script.onload = () => render()

    document.body.appendChild(script)

    const interval = setInterval(() => {
      if (window.Ecwid) {
        window.Ecwid.init()
        clearInterval(interval)
      }
    }, 100)
  })

  onUnmounted(() => {
    const container = document.getElementById(containerId)
    container?.remove()

    const recentlyUpdatedProductsWidget = document.getElementById(
      'recently-updated-products-widget'
    )
    recentlyUpdatedProductsWidget?.remove()
  })
}
