import { User } from 'src/users/entities/users.entities';

export interface ProductsComment {
  id: number;
  score: number;
  description: string;
  userId: string;
  user: User;
  product: number;
  dateTime: string;
}
