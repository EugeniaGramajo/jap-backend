import { Products } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/users.entities';

export interface ProductsComment {
  id: number;
  score: number;
  description: string;
  userId: string;
  user: User;
  productId: number;
  product: Products;
}
