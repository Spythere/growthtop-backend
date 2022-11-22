import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { ProductService } from '../products/products.service';
import { ScraperController } from './scraper.controller';
import { ScraperService } from './scraper.service';

@Module({
  controllers: [ScraperController],
  providers: [ScraperService, ProductService],
  imports: [ProductsModule]
})
export class ScraperModule {


  onModuleInit() {
    
  }
}
