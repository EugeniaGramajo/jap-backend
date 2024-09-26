import { Products } from 'src/products/entities/product.entity';

export interface Category {
  id: number;
  name: string;
  description: string;
  imgSrc: string;
  products: Products[];
}
