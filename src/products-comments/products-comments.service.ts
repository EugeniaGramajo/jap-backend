import { Injectable } from '@nestjs/common';
import { CreateProductsCommentDto } from './dto/create-products-comment.dto';
import { UpdateProductsCommentDto } from './dto/update-products-comment.dto';

@Injectable()
export class ProductsCommentsService {
  create(createProductsCommentDto: CreateProductsCommentDto) {
    return 'This action adds a new productsComment';
  }

  findAll() {
    return `This action returns all productsComments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productsComment`;
  }

  update(id: number, updateProductsCommentDto: UpdateProductsCommentDto) {
    return `This action updates a #${id} productsComment`;
  }

  remove(id: number) {
    return `This action removes a #${id} productsComment`;
  }
}
