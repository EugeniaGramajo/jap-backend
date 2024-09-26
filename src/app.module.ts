import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsCommentsModule } from './products-comments/products-comments.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    ProductsModule,
    CategoriesModule,
    ProductsCommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
