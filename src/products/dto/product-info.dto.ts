import { relatedProductsDto } from './related-products.dto';

export class ProductInfoDto {
  id: number;
  name: string;
  description: string;
  cost: number;
  currency: string;
  soldCount: number;
  image: string[];
  relatedProducts: relatedProductsDto[];
}
