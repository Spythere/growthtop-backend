import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiService } from './api.service';
import { GetProductsDto } from './dto/getProducts.dto';

@ApiTags('api')
@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @ApiResponse({
    status: 200,
    description: 'Returns all products with specified category.',
  })
  @Get('/products')
  async getProductByCategory(@Query() dto: GetProductsDto) {
    return this.apiService.getProductsByCategory(dto.category);
  }

  @ApiResponse({
    status: 200,
    description: 'Returns all categories and item count of each of them',
  })
  @Get('/categories')
  async getCategories() {
    return this.apiService.getCategories();
  }
}
