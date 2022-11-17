import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApiService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProductsByCategory(categoryName: string) {
    return (
      await this.prismaService.products.findMany({
        where: {
          category: categoryName,
        },
      })
    ).map((p) => {
      delete p.id;
      return p;
    });
  }

  async getCategories() {
    return (
      await this.prismaService.products.groupBy({
        by: ['category'],
        _count: {
          _all: true,
        },
      })
    ).map((res) => ({ category: res.category, count: res._count._all }));
  }
}
