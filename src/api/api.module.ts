import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { ProductService } from '../products/products.service';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService, ProductService],
  imports: [ProductsModule]
})
export class ApiModule {}
