import { Controller } from '@nestjs/common';
import { amazonURLs } from '../consts/amazonURLs';
import { PrismaService } from '../prisma/prisma.service';
import {
  AmazonCategoryType,
  IAmazonBestseller,
} from '../types/amazonScraperTypes';

import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(
    private readonly scraperService: ScraperService,
    private readonly prismaService: PrismaService,
  ) {
    this.fetchPageData();
  }

  async fetchPageData() {
    const products: IAmazonBestseller[] = [];

    for (let category in amazonURLs) {
      const categoryProducts =
        await this.scraperService.fetchAmazonDepartmentBestsellers(
          category as AmazonCategoryType,
        );

      console.log(`Pobrano produkty dla kategorii "${category}"`);

      products.push(...categoryProducts);
    }

    this.prismaService.createOrUpdateProducts(
      products.map((prod) => ({
        ...prod,
        product_id: `${prod.category}_${prod.position}`,
        refreshed_at: new Date(),
      })),
    );
  }
}
