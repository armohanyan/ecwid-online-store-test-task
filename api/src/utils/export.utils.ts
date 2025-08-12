import { IProduct } from '../types/product';

export const PRODUCT_FIELDS_USED = [
  'id',
  'name',
  'sku',
  'url',
  'thumbnailUrl',
  'unlimited',
  'inStock',
  'price',
];

const pickFields = (products: IProduct[]) => {
  return products.map((product) =>
    PRODUCT_FIELDS_USED.reduce(
      (acc, field) => ({ ...acc, [field]: product[field] }),
      {},
    ),
  );
};

export default {
  pickFields,
};
