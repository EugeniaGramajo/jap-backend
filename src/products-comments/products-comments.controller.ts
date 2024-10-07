import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsCommentsService } from './products-comments.service';
import { CreateProductsCommentDto } from './dto/create-products-comment.dto';

@Controller('products-comments')
export class ProductsCommentsController {
  constructor(
    private readonly productsCommentsService: ProductsCommentsService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() createProductsCommentDto: CreateProductsCommentDto) {
    return this.productsCommentsService.create(createProductsCommentDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.productsCommentsService.findAll(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsCommentsService.remove(+id);
  }
}
