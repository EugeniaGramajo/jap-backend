import { Module } from '@nestjs/common';
import { ProductsCommentsService } from './products-comments.service';
import { ProductsCommentsController } from './products-comments.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsCommentsController],
  providers: [ProductsCommentsService],
})
export class ProductsCommentsModule {}
