import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProductsDto } from './dto/get-products.dto';
import { ProductInfoDto } from './dto/product-info.dto';
import { getRandomInt } from 'src/utils/mathRandom';
import { ProductDto } from './dto/products.dto';

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
        return { ...product, categoryId: undefined, image: product.image[0] };
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

  async bestSellers(): Promise<ProductDto[]> {
    const allProducts = await this.prisma.products.findMany();
    const random = allProducts.sort(() => 0.5 - Math.random()).slice(0, 6);
    return random.map((e) => {
      return {
        id: e.id,
        name: e.name,
        description: e.description,
        cost: e.cost,
        currency: e.currency,
        soldCount: e.soldCount,
        image: e.image[0],
      };
    });
  }

  async findOne(id: string): Promise<ProductInfoDto> {
    const product = await this.prisma.products.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    let allProducts = await this.prisma.products.findMany({
      where: {
        categoryId: product.categoryId,
      },
    });
    if (!allProducts || allProducts.length < 3) {
      allProducts = await this.prisma.products.findMany();
    }
    const random = new Set<number>();
    while (random.size < 3) {
      random.add(getRandomInt(allProducts.length));
    }
    const relatedProducts = Array.from(random).map((e) => {
      const data = allProducts[e];
      return {
        id: data.id,
        name: data.name,
        image: data.image[0],
      };
    });

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      cost: product.cost,
      currency: product.currency,
      soldCount: product.soldCount,
      image: product.image,
      relatedProducts,
    };
  }

  async generalSearch(item: string): Promise<ProductDto[]> {
    const normalizedItem = item
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const productsFound = await this.prisma.$queryRaw<ProductDto[]>`
    SELECT * FROM "products"
    WHERE unaccent("title") ILIKE unaccent(${normalizedItem})
    OR unaccent("description") ILIKE unaccent(${normalizedItem})
    ORDER BY 
      CASE WHEN unaccent("title") ILIKE unaccent(${normalizedItem}) THEN 1 ELSE 2 END
  `;

    return productsFound;
  }
}
