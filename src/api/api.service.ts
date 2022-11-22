import { Injectable } from '@nestjs/common';
import { ProductService } from '../products/products.service';

@Injectable()
export class ApiService {
  constructor(private readonly productsService: ProductService) {}

  async getProductsByCategory(categoryName: string) {
    return this.productsService.findByCategory(categoryName);
  }

  async getCategories() {
    return this.productsService.findCategories();
  }

  async getSuggestions(query: string) {
    return (await this.productsService.findSuggestions(query)).map(s => s.category_name);
  }
}
