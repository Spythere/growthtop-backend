import { Module } from '@nestjs/common';
import { CategoriesModule } from '../categories/categories.module';
import { CategoryService } from '../categories/category.service';
import { ProductsModule } from '../products/products.module';
import { ProductService } from '../products/products.service';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';

@Module({
  controllers: [ScraperController],
  providers: [ScraperService, ProductService, CategoryService],
  imports: [ProductsModule, CategoriesModule]
})
export class ScraperModule {


  onModuleInit() {
    
  }
}
