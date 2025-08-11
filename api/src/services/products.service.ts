import {IProduct} from "../types/product";
import axios from "axios";
import config from "../config";

const ECWID_API_URL =
    `https://app.ecwid.com/api/v3/${config.STORE_ID}/products?&sortBy=UPDATED_TIME_DESC&responseFields=total,items(id,name,sku,url,thumbnailUrl,unlimited,inStock,price)`;

class ProductsService {
    static async fetchProducts(): Promise<IProduct[]> {
        const { data } = await axios.get(ECWID_API_URL, {
            headers: {
                Authorization: `Bearer ${config.API_TOKEN}`
            }
        });

        return data.items || [];
    }
}

export default ProductsService;