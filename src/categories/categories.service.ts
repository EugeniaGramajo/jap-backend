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
        imgSrc: e.img_src,
        productCount: productSolds.toString(),
      };
    });
  }

  async footer(): Promise<GetCategoryDto[]> {
    const categories = await this.findAll();
    for (let i = categories.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [categories[i], categories[j]] = [categories[j], categories[i]];
    }

    return categories.slice(0, 6);
  }
}
