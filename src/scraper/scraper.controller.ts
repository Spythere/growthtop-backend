import { Controller, Logger, OnModuleInit } from '@nestjs/common';
import { amazonURLs } from '../consts/amazonURLs';
import { ProductService } from '../products/products.service';
import {
  AmazonCategoryType,
  IAmazonBestseller,
} from '../types/amazonScraperTypes';

import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController implements OnModuleInit {
  private readonly logger = new Logger(ScraperController.name);

  constructor(
    private readonly scraperService: ScraperService,
    private readonly productService: ProductService,
  ) {}

  onModuleInit() {
    this.fetchPageData();
  }

  async fetchPageData() {
    const products: IAmazonBestseller[] = [];

    this.logger.log('Scraping data from amazon.com (US)...');

    for (let category in amazonURLs) {
      this.logger.log(`Currently scraping: ${category}`);

      try {
        const categoryProducts =
          await this.scraperService.fetchAmazonDepartmentBestsellers(
            category as AmazonCategoryType,
          );

        this.logger.log(
          `Ended scraping ${category} category with ${categoryProducts.length} results!`,
        );

        products.push(...categoryProducts);
      } catch (error) {
        this.logger.error(
          `Error occurred when trying to scrap ${category} category!`,
          error,
        );
      }

      await new Promise((resolve) =>
        setTimeout(resolve, Math.floor(Math.random() * 3000) + 2000),
      );
    }

    this.logger.log('Scraping data has ended!');

    this.logger.log('Updating products in DB...');
    await this.productService.createOrUpdateProducts(products);
    this.logger.log('Products in DB successfully updated!');
  }
}
