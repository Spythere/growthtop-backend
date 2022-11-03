import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
  constructor(
    private readonly apiService: ApiService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get('/products')
  async getProductById() {
    return (await this.prismaService.products.findMany({})).map((p) => {
      delete p.id;
      return p;
    });
  }
}
