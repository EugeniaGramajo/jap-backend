import { PartialType } from '@nestjs/mapped-types';
import { CreateProductsCommentDto } from './create-products-comment.dto';

export class UpdateProductsCommentDto extends PartialType(
  CreateProductsCommentDto,
) {}
