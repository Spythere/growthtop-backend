import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module';
import { CategoryService } from '../categories/category.service';
import { ProductsModule } from '../products/products.module';
import { ProductService } from '../products/products.service';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  controllers: [ApiController],
  providers: [ApiService, ProductService, CategoryService],
  imports: [ProductsModule, CategoriesModule]
})
export class ApiModule {}
