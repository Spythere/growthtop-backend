import { Controller, Get, Query } from '@nestjs/common';
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
    return this.apiService.getProductsByCategory(
      dto.category.replace(/_/g, ' '),
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Returns all categories info',
  })
  @Get('/categories')
  async getCategories() {
    const categories = await this.apiService.getCategories();

    let maxCred = 1;
    for (let category of categories) {
      if (category.credibility > maxCred) maxCred = category.credibility;
    }

    const mappedCategories = categories.reduce((acc, cat) => {
      acc.push({
        category: cat.name,
        category_name: cat.display_name,
        credibility: ((cat.credibility / maxCred) * 100),
      });

      return acc;
    }, []);

    return mappedCategories;
  }

  // @ApiResponse({
  //   status: 200,
  //   description: 'Returns categories suggestions for entered query string',
  // })
  // @Get('/suggestions')
  // async getSuggestions(@Query('query') query: string) {
  //   return this.apiService.getSuggestions(query);
  // }
}
