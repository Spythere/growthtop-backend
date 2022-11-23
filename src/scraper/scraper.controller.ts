import { Controller, Logger, OnModuleInit } from '@nestjs/common';
import { amazonURLs } from '../consts/amazonURLs';
import { ProductService } from '../products/products.service';
import {
  AmazonCategoryType,
  IAmazonBestseller,
} from '../types/amazonScraperTypes';
import { createBrowser } from '../utils/webScraperUtils';

import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController implements OnModuleInit {
  private readonly logger = new Logger(ScraperController.name);

  constructor(
    private readonly scraperService: ScraperService,
    private readonly productService: ProductService,
  ) {}

  onModuleInit() {
    // if (process.env.NODE_ENV === 'development') 
    this.fetchPageData();
  }

  async fetchPageData() {
    const products: IAmazonBestseller[] = [];

    const { browser, page } = await createBrowser();

    this.logger.log('Scraping data from amazon.com (US)...');

    for (let category in amazonURLs) {
      products.length = 0;

      this.logger.log(`Currently scraping: ${category}`);

      try {
        const categoryProducts =
          await this.scraperService.fetchAmazonDepartmentBestsellers(
            page,
            category as AmazonCategoryType,
          );

        this.logger.log(
          `Ended scraping ${category} category with ${categoryProducts.length} results!`,
        );

        products.push(...categoryProducts);

        this.logger.log(`Updating ${category} products in DB...`);
        await this.productService.createOrUpdateProducts(products);
        this.logger.log('Products in DB successfully updated!');
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

    browser.close();
    this.logger.log('Scraping data has ended!');
  }
}
