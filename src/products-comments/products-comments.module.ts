import { Module } from '@nestjs/common';
import { ProductsCommentsService } from './products-comments.service';
import { ProductsCommentsController } from './products-comments.controller';

@Module({
  controllers: [ProductsCommentsController],
  providers: [ProductsCommentsService],
})
export class ProductsCommentsModule {}
