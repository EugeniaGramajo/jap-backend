import { Category } from 'src/categories/entities/category.entity';
import { ProductsComment } from 'src/products-comments/entities/products-comment.entity';

export interface Products {
  id: number;
  name: string;
  description: string;
  cost: number;
  currency: Currency;
  soldCount: number;
  image: string[];
  categoryId: number;
  catName: Category;
  comments: ProductsComment[];
}

export enum Currency {
  USD = 'USD',
  UYU = 'UYU',
}
