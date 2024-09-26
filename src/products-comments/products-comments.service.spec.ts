import { Test, TestingModule } from '@nestjs/testing';
import { ProductsCommentsService } from './products-comments.service';

describe('ProductsCommentsService', () => {
  let service: ProductsCommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsCommentsService],
    }).compile();

    service = module.get<ProductsCommentsService>(ProductsCommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
