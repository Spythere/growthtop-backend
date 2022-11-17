import { Controller, Get, Param, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiService } from './api.service';
import { GetProductsDto } from './dto/getProducts.dto';

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get('/products')
  async getProductByCategory(@Query() dto: GetProductsDto) {
    return this.apiService.getProductsByCategory(dto.category);
  }

  @Get('/categories')
  async getCategories() {
    return this.apiService.getCategories();
  }
}
