import { Module } from '@nestjs/common';
import { categoryProviders } from '../categories/categories.provider';
import { CategoryController } from '../categories/category.controller';
import { CategoryService } from '../categories/category.service';
import { DatabaseModule } from '../database/database.module';
import { ProductController } from './products.controller';
import { productProviders } from './products.provider';
import { ProductService } from './products.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController, CategoryController],
  providers: [ProductService, ...productProviders, CategoryService, ...categoryProviders],
  exports: [ProductService, ...productProviders, CategoryService, ...categoryProviders]
})
export class ProductsModule {}
