import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ProductController } from './products.controller';
import { productProviders } from './products.provider';
import { ProductService } from './products.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductController],
  providers: [ProductService, ...productProviders],
  exports: [ProductService, ...productProviders]
})
export class ProductsModule {}
