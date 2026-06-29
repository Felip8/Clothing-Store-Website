import type { ProductImages } from "./productImages";

export interface ProductVariationDto {
  productId: number;
  variationId?: number;
  productName: string;
  productDescription: string;
  price: number;
  score?: number;
  categoryName?: string;
  collectionName?: string;
  color?: string;
  size?: string;
  skuCode?: string;
  stock?: number;
  inStock?: boolean;
  images?: ProductImages[];
}
