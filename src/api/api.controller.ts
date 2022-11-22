import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { ApiService } from './api.service';
import { GetProductsDto } from './dto/getProducts.dto';
import { GetCategoriesResponse } from './responses/getCategories.response';
import { GetProductsResponse } from './responses/getProducts.response';

@ApiTags('api')
@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @ApiResponse({
    status: 200,
    description: 'Returns all products with specified category.',
    type: [GetProductsResponse],
  })
  @Get('/products')
  async getProductByCategory(@Query() dto: GetProductsDto) {
    return this.apiService.getProductsByCategory(
      dto.category.replace(/_/g, ' '),
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Returns all categories and item count of each of them',
    type: [GetCategoriesResponse],
  })
  @Get('/categories')
  async getCategories() {
    return this.apiService.getCategories();
  }

  @ApiResponse({
    status: 200,
    description: 'Returns categories suggestions for entered query string',
  })
  @Get('/suggestions')
  async getSuggestions(@Query('query') query: string) {
    return this.apiService.getSuggestions(query);
  }
}
