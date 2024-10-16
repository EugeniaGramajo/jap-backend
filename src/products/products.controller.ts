import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('cat/:category')
  findAll(@Param('category') category: string) {
    return this.productsService.findAll(category);
  }

  @Get('bestSellers')
  bestSellers() {
    return this.productsService.bestSellers();
  }

  @Get('info/:id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Get('generalSearch/:item')
  generalSearch(@Param('item') item: string) {
    return this.productsService.generalSearch(item);
  }
}
