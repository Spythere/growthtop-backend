import { Model } from 'mongoose';
import { Injectable, Inject, Logger } from '@nestjs/common';
import { IProduct, IProductDoc } from './interfaces/product.interface';
import { IAmazonBestseller } from '../types/amazonScraperTypes';
import { ICategoryDoc } from '../categories/interfaces/category.interface';

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);

  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<IProductDoc>,
    @Inject('CATEGORY_MODEL')
    private categoryModel: Model<ICategoryDoc>,
  ) {}

  async findAll(): Promise<IProductDoc[]> {
    return this.productModel.find().exec();
  }

  async findByCategory(categoryName: string) {
    const category = await this.categoryModel.findOne({
      name: categoryName,
    });

    if (!category) return [];

    return this.productModel.find(
      {
        category_id: category._id,
      },
      [],
      {
        sort: {
          position: 1,
        },
      },
    );
  }

  async updateCategoryProducts(
    categoryId: string,
    products: IAmazonBestseller[],
  ) {
    const productsData: IProduct[] = products.map((prod) => ({
      ...prod,
      product_id: `${prod.category}_${prod.position}`,
      refreshed_at: new Date(),
      category_id: categoryId,
    }));

    const productsIds = productsData.map((p) => p.product_id);

    // Product documents exisitng in DB with specified products ids
    const dbProductDocs = await this.productModel.find({
      product_id: {
        $in: productsIds,
      },
    });

    // Product list to create & update in DB
    const [createdCount, updatedCount] = await productsData.reduce(
      async (acc, p) => {
        const savedProduct = dbProductDocs.find(
          (sp) => sp.product_id == p.product_id,
        );

        if (savedProduct) {
          await this.productModel.updateOne(
            {
              product_id: p.product_id,
            },
            { ...p },
          );

          (await acc)[1]++;
          return acc;
        }

        await this.productModel.create(p);

        (await acc)[0]++;
        return acc;
      },
      Promise.resolve([0, 0]),
    );

    this.logger.log(`Added: ${createdCount}; Updated: ${updatedCount}`);
  }
}
