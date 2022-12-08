import { Injectable } from '@nestjs/common';
import { CategoryService } from '../categories/category.service';
import { ProductService } from '../products/products.service';

@Injectable()
export class ApiService {
  constructor(
    private readonly productsService: ProductService,
    private readonly categoriesService: CategoryService,
  ) {}

  async getProductsByCategory(categoryName: string) {
    return this.productsService.findByCategory(categoryName);
  }

  async getCategories() {
    return this.categoriesService.findAll();
  }

  async getProductsCredibility(categoryName: string) {
    const category = await this.categoriesService.findOneByName(categoryName);

    if (!category) return [];

    // to do
  }

  // async getSuggestions(query: string) {
  //   return (await this.productsService.findSuggestions(query)).map(s => s.category_name);
  // }
}
