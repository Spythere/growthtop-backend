import { Injectable } from '@nestjs/common';
import { ProductService } from '../products/products.service';

@Injectable()
export class ApiService {
  constructor(private readonly productsService: ProductService) {}

  async getProductsByCategory(categoryName: string) {
    return this.productsService.findByCategory(categoryName);
    // return (
    //   await this.prismaService.products.findMany({
    //     where: {
    //       category: categoryName,
    //     },
    //   })
    // ).map((p) => {
    //   delete p.id;
    //   return p;
    // });
  }

  async getCategories() {
    return this.productsService.findCategories();
    // return (
    //   await this.prismaService.products.groupBy({
    //     by: ['category'],
    //     _count: {
    //       _all: true,
    //     },
    //   })
    // ).map((res) => ({ category: res.category, count: res._count._all }));
  }
}
