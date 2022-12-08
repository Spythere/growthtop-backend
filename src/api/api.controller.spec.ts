import { Test, TestingModule } from '@nestjs/testing';
import { ProductsModule } from '../products/products.module';
import { ProductService } from '../products/products.service';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { mockProducts } from './mockResources/mockProducts';

describe('ApiController', () => {
  let controller: ApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiController],
      providers: [
        ApiService,
        {
          provide: ProductService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockProducts),
          },
        },
      ],
      imports: [ProductsModule]
    }).compile();

    controller = module.get<ApiController>(ApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
