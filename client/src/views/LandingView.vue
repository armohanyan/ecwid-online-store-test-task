<template>
  <router-link to="/settings">Settings</router-link>

  <div id="ecwid-store-container">
    <div id="my-store-101560752"></div>
  </div>

</template>

<script setup lang="ts">
import {nextTick, onBeforeUnmount, onMounted, onUnmounted, ref} from 'vue'
import axios from "axios";
import {useStoreSettings} from "@/composables/useStoreSettings";

// Your public token
const TOKEN = 'public_ie55a1cQU472c1GBmeBqAVpL1ks3LFpu'
const STORE_ID = '101560752'
const API_BASE = `https://app.ecwid.com/api/v3/${STORE_ID}`

const storeSettings =  useStoreSettings()

const numberOfRecentProducts = ref(storeSettings.defaultProductCount.value)

function loadEcwidWidget() {
  // Remove any previous render (optional but helpful if Ecwid fails to re-render)
  const container = document.getElementById('my-store-101560752');
  if (container) {
    container.innerHTML = ''; // Clear any previous Ecwid content
  }

  // Inject Ecwid script if not already injected
  if (!window.Ecwid) {
    const script = document.createElement('script');
    script.src = 'https://app.ecwid.com/script.js?101560752&data_platform=code&data_date=2025-08-01';
    script.setAttribute('data-cfasync', 'false');
    script.charset = 'utf-8';
    script.onload = () => {
      renderWidget();
    };
    document.body.appendChild(script);
  } else {
    renderWidget();
  }
}

function renderWidget() {
  nextTick(() => {
    window.xProductBrowser?.(
        'categoriesPerRow=3',
        'views=grid(20,3) list(60) table(60)',
        'categoryView=grid',
        'searchView=list',
        'id=my-store-101560752'
    );
  });
}

async function fetchRecentlyUpdatedProducts(limit = 4) {
  const data = await axios(`${API_BASE}/products?limit=${limit}`, {
    headers: {
      Authorization: 'Bearer ' + TOKEN
    }
  });

  return data.items
}

// Create the widget DOM
function createWidget(products: any[]) {
  const containerId = 'recently-updated-products-widget'
  let existing = document.getElementById(containerId)
  if (existing) existing.remove()

  const container = document.createElement('div')
  container.id = containerId
  container.style.padding = '16px'
  container.style.borderTop = '1px solid #ccc'

  const title = document.createElement('h3')
  title.textContent = 'Recently Updated Products'
  title.style.marginBottom = '12px'
  container.appendChild(title)

  // Dropdown for selecting number of products
  const dropdown = document.createElement('select')
  dropdown.innerHTML = [2, 4, 6, 8, 10].map(n =>
      `<option value="${n}" ${n === numberOfRecentProducts.value ? 'selected' : ''}>Show ${n}</option>`
  ).join('')
  dropdown.onchange = async (e: any) => {
    numberOfRecentProducts.value = parseInt(e.target.value)
    const newProducts = await fetchRecentlyUpdatedProducts(numberOfRecentProducts.value)
    createWidget(newProducts)
  }
  container.appendChild(dropdown)

  const grid = document.createElement('div')
  grid.style.display = 'grid'
  grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(150px, 1fr))'
  grid.style.gap = '12px'
  grid.style.marginTop = '12px'

  for (const product of products) {
    const card = document.createElement('div')
    card.style.border = '1px solid #eee'
    card.style.padding = '8px'
    card.style.textAlign = 'center'
    card.style.borderRadius = '6px'
    card.style.background = '#fff'

    const img = document.createElement('img')
    img.src = product.thumbnailUrl || ''
    img.style.width = '100%'
    img.style.objectFit = 'cover'
    img.style.cursor = 'pointer'
    img.onclick = () => window.location.href = product.url
    card.appendChild(img)

    const name = document.createElement('div')
    name.textContent = product.name
    name.style.cursor = 'pointer'
    name.style.margin = '6px 0'
    name.onclick = () => window.location.href = product.url
    card.appendChild(name)

    const buyBtn = document.createElement('button')
    buyBtn.textContent = 'Buy now'
    buyBtn.onclick = () => {
      window.Ecwid?.Cart?.addProduct(product.id)
    }
    buyBtn.style.padding = '6px 12px'
    buyBtn.style.border = 'none'
    buyBtn.style.background = '#3c77a4'
    buyBtn.style.color = '#fff'
    buyBtn.style.cursor = 'pointer'
    buyBtn.style.borderRadius = '4px'
    card.appendChild(buyBtn)

    grid.appendChild(card)
  }

  container.appendChild(grid)

  // Insert below cart
  const target = document.querySelector('.ec-cart__body') || document.body
  target.appendChild(container)
}

// Hook into Ecwid cart page
function waitForEcwidReady(callback: () => void) {
  const check = () => {
    if (window.Ecwid && window.Ecwid.OnPageLoad) {
      window.Ecwid.OnPageLoad.add(callback)
    } else {
      setTimeout(check, 500)
    }
  }
  check()
}

onMounted(() => {
  console.log(storeSettings, 'store settigns')

  loadEcwidWidget()

  waitForEcwidReady(async () => {

    if (storeSettings.widgetEnabled.value) {
      window.Ecwid.OnPageLoaded.add(async (page: any) => {
        const widget = document.getElementById('recently-updated-products-widget')

        if (page.type === 'CART') {
          const products = await fetchRecentlyUpdatedProducts(numberOfRecentProducts.value)
          createWidget(products)
        } else {
          if (widget && widget.parentElement) {
            widget.parentElement.removeChild(widget)
          }
        }
      });
    }
  })
})

onBeforeUnmount(() => {
  const widget = document.getElementById('recently-updated-products-widget')
  console.log(widget, 'test')
  if (widget && widget.parentElement) {
    widget.remove()
  }
})
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;
}
</style>
