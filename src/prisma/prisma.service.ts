import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IProduct } from '../types/productTypes';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }

  async createOrUpdateProducts(productsData: IProduct[]) {
    if (productsData.length == 0) return -1;

    console.time('products');

    await this.products.updateMany({
      data: productsData.map((product) => {
        return {
              //TO DO           
        };
      }),
    });
    // const data = await productsData.reduce(async (acc, product) => {
    //   const productToUpdate = { ...product };
    //   delete productToUpdate.product_id;

    //   const dbProduct = await this.products.upsert({
    //     where: {
    //       product_id: product.product_id,
    //     },
    //     update: productToUpdate,
    //     create: product,
    //   });

    //   (await acc).push(dbProduct.product_id);
    //   return acc;
    // }, Promise.resolve([] as string[]));

    console.timeEnd('products');
  }
}
