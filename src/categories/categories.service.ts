import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetCategoryDto } from './dto/get-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<GetCategoryDto[]> {
    const categories = await this.prisma.category.findMany({
      include: {
        products: {
          select: {
            soldCount: true,
          },
        },
      },
    });

    return categories.map((e) => {
      const productSolds = e.products?.reduce(
        (sum, product) => sum + product.soldCount,
        0,
      );

      return {
        id: e.id,
        name: e.name,
        description: e.description,
        imgSrc: e.imgSrc,
        productCount: productSolds.toString(),
      };
    });
  }
}
