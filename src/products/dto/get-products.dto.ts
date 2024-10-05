import { ProductDto } from './products.dto';

export class GetProductsDto {
  catID: number;
  catName: string;
  products: ProductDto[];
}
