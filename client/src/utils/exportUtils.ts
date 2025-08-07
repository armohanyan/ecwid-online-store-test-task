import { IProduct } from '@/types/product'
import * as XLSX from 'xlsx'
import { PRODUCT_FIELDS_USED } from '@/consts'

const fieldsToExport = PRODUCT_FIELDS_USED

const pickFields = (products: IProduct[]) => {
  return products.map((product) =>
    fieldsToExport.reduce((acc, field) => ({ ...acc, [field]: product[field] }), {})
  )
}

export function exportToXLSX(items: IProduct[], filename = 'export.xlsx') {
  if (!items.length) return
  const itemsToExport = pickFields(items)

  const worksheet = XLSX.utils.json_to_sheet(itemsToExport)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')

  XLSX.writeFile(workbook, filename)
}

export function exportToCSV(items: IProduct[], filename = 'export.csv') {
  if (!items.length) return
  const itemsToExport: Partial<IProduct>[] = pickFields(items)

  const headers = Object.keys(itemsToExport[0])
  const rows = itemsToExport.map((item) =>
    headers.map((h) => JSON.stringify(item[h] ?? '')).join(',')
  )
  const csvContent = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')

  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', filename)
  link.click()
}
