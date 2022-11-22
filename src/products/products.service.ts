import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Product } from './interfaces/product.interface';
import { IProduct } from '../types/productTypes';
import { IAmazonBestseller } from '../types/amazonScraperTypes';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findByCategory(category: string) {
    return this.productModel.find({
      category,
    });
  }

  async findCategories() {
    return this.productModel.aggregate([
      {
        $group: {
          _id: {
            category: '$category',
          },
          category: { $first: '$category' },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);
  }

  async createOrUpdateProducts(products: IAmazonBestseller[]) {
    const productsData: IProduct[] = products.map((prod) => ({
      ...prod,
      product_id: `${prod.category}_${prod.position}`,
      refreshed_at: new Date(),
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

    console.log(`Added: ${createdCount}; Updated: ${updatedCount}`);
  }
}
