import { Test, TestingModule } from '@nestjs/testing';
import { ProductsCommentsController } from './products-comments.controller';
import { ProductsCommentsService } from './products-comments.service';

describe('ProductsCommentsController', () => {
  let controller: ProductsCommentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsCommentsController],
      providers: [ProductsCommentsService],
    }).compile();

    controller = module.get<ProductsCommentsController>(
      ProductsCommentsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
