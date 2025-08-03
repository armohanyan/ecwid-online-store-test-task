export function exportToCSV(items: any[], filename = 'export.csv') {
    if (!items.length) return;

    const headers = Object.keys(items[0]);
    const rows = items.map(item => headers.map(h => JSON.stringify(item[h] ?? '')).join(','));
    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');

    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    link.click();
}