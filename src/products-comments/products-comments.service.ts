import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductsCommentDto } from './dto/create-products-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetProductsCommentDto } from './dto/get-products-comment.dto';

@Injectable()
export class ProductsCommentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createProductsCommentDto: CreateProductsCommentDto) {
    try {
      const { score, description, userId, productId, dateTime } =
        createProductsCommentDto;
      await this.prisma.productsComments.create({
        data: {
          score,
          description,
          userId,
          productId,
          dateTime: new Date(dateTime),
        },
      });
      return 'Reseña agregada con éxito!';
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocurrió un error al guardar el comentario, intente nuevamente.',
      );
    }
  }

  async findAll(id: string): Promise<GetProductsCommentDto[]> {
    try {
      const comments = await this.prisma.productsComments.findMany({
        where: {
          productId: parseInt(id),
        },
        include: {
          user: {
            select: {
              name: true,
              lastName: true,
            },
          },
        },
      });
      return comments.map((e) => {
        return {
          id: e.id,
          score: e.score,
          description: e.description,
          user: e.user.name + ' ' + e.user.lastName,
          dateTime: e.dateTime.toISOString(),
          product: parseInt(id),
        };
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Ocurrió un error al recuperar los comentarios.',
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} productsComment`;
  }

  async remove(id: number): Promise<string> {
    try {
      await this.prisma.productsComments.delete({
        where: {
          id,
        },
      });
      return 'Comentario borrado con éxito.';
    } catch (error) {
      throw new InternalServerErrorException('Error al borrar el comentario.');
    }
  }
}
