import * as XLSX from 'xlsx';
import { Response } from 'express';
import {IProduct} from "../types/product";
import ProductsService from "./products.service";
import {ProductService} from "./index";
import {ExportUtils} from "../utils";

class ExportService {
    static async exportXLSX(selectedIds: number[], res: Response) {
        const products = await ProductsService.fetchProducts();

        if (!products.length) {
            res.status(404).send('No products to export');
            return;
        }

        const filteredProducts = products.filter((product) => selectedIds.includes(product.id));
        const itemsToExport = ExportUtils.pickFields(filteredProducts);
        const worksheet = XLSX.utils.json_to_sheet(itemsToExport);
        const workbook = XLSX.utils.book_new();

        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

        const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });

        res.setHeader('Content-Disposition', `attachment; filename="export.xlsx"`);
        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        res.send(buffer);
    }

    static async exportCSV(selectedIds: number[], res: Response) {
        const products = await ProductService.fetchProducts();

        if (!products.length) {
            res.status(404).send('No products to export');
            return;
        }

        const filteredProducts = products.filter((product) => selectedIds.includes(product.id));

        const itemsToExport: Partial<IProduct>[] = ExportUtils.pickFields(filteredProducts);
        const headers = Object.keys(itemsToExport[0]);
        const rows = itemsToExport.map((item) =>
            headers.map((h) => JSON.stringify(item[h] ?? '')).join(',')
        );
        const csvContent = [headers.join(','), ...rows].join('\n');

        res.setHeader('Content-Disposition', `attachment; filename="export.csv"`);
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');

        res.send(csvContent);
    }
}

export default ExportService;