import { Injectable, Logger, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { IProduct } from '../products/interfaces/product.interface';
import { ICategoryDoc } from './interfaces/category.interface';

@Injectable()
export class CategoryService {
  private readonly logger = new Logger(CategoryService.name);

  constructor(
    @Inject('CATEGORY_MODEL')
    private categoryModel: Model<ICategoryDoc>,
  ) {}

  async findAll(): Promise<ICategoryDoc[]> {
    return this.categoryModel.find().exec();
  }

  async findOneById(id: string): Promise<ICategoryDoc> {
    return this.categoryModel.findOne({
      _id: id,
    });
  }

  async findOneByName(name: string): Promise<ICategoryDoc> {
    return this.categoryModel.findOne({
      name,
    });
  }
  async updateById(id: string, updateData: Partial<IProduct>) {
    return await this.categoryModel.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          ...updateData,
        },
      },
    );
  }
}
