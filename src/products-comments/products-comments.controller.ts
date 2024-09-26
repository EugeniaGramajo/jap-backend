import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsCommentsService } from './products-comments.service';
import { CreateProductsCommentDto } from './dto/create-products-comment.dto';
import { UpdateProductsCommentDto } from './dto/update-products-comment.dto';

@Controller('products-comments')
export class ProductsCommentsController {
  constructor(
    private readonly productsCommentsService: ProductsCommentsService,
  ) {}

  @Post()
  create(@Body() createProductsCommentDto: CreateProductsCommentDto) {
    return this.productsCommentsService.create(createProductsCommentDto);
  }

  @Get()
  findAll() {
    return this.productsCommentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsCommentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductsCommentDto: UpdateProductsCommentDto,
  ) {
    return this.productsCommentsService.update(+id, updateProductsCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsCommentsService.remove(+id);
  }
}
