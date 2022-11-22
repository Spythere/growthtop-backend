import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { HttpModule } from '@nestjs/axios';
import { ScraperModule } from './scraper/scraper.module';
import { DatabaseModule } from './database/database.module';
import { ProductsModule } from './products/products.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [ApiModule, HttpModule, ScraperModule, DatabaseModule, ProductsModule],
})
export class AppModule {}
