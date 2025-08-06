import { IProduct } from '@/types/product'
import * as XLSX from 'xlsx'

export function exportToXLSX(items: IProduct[], filename = 'export.xlsx') {
  if (!items.length) return

  const worksheet = XLSX.utils.json_to_sheet(items)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Products')

  XLSX.writeFile(workbook, filename)
}

export function exportToCSV(items: IProduct[], filename = 'export.csv') {
  if (!items.length) return

  const headers = Object.keys(items[0])
  const rows = items.map((item) => headers.map((h) => JSON.stringify(item[h] ?? '')).join(','))
  const csvContent = [headers.join(','), ...rows].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')

  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', filename)
  link.click()
}
