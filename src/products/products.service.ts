import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProductsDto } from './dto/get-products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(category: string): Promise<GetProductsDto> {
    try {
      const categoryName = await this.prisma.category.findUnique({
        where: {
          id: parseInt(category),
        },
      });
      if (!categoryName) {
        throw new Error('Category not found');
      }
      const products = await this.prisma.products.findMany({
        where: {
          categoryId: parseInt(category),
        },
      });
      const productsWithoutCategoryId = products.map((product) => {
        return { ...product, categoryId: undefined };
      });

      return {
        catID: parseInt(category),
        catName: categoryName.name,
        products: productsWithoutCategoryId,
      };
    } catch (error) {
      console.log(error);
      throw new Error('Could not retrieve products for the category');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}
