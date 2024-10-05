import { Products } from 'src/products/entities/product.entity';

export interface Category {
  id: number;
  name: string;
  description: string;
  img_src: string;
  products: Products[];
}
