import { Controller, Get, Post, Body } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
}
