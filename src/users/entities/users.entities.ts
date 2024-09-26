import { ProductsComment } from 'src/products-comments/entities/products-comment.entity';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  lastName: string;
  address?: string;
  productsComments: ProductsComment[];
  createdAt: Date;
}
