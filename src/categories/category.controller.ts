import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ICategoryDoc } from './interfaces/category.interface';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll(): Promise<ICategoryDoc[]> {
    return this.categoryService.findAll();
  }
}
