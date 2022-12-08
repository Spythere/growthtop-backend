import { Controller, Logger, OnModuleInit } from '@nestjs/common';
import { CategoryService } from '../categories/category.service';
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
    private readonly categoryService: CategoryService,
  ) {}

  async onModuleInit() {
    if (process.env.NODE_ENV === 'development') {
      // this.fetchAndUpdateBestsellers();
    }
  }

  async fetchAndUpdateBestsellers() {
    const productsData: IAmazonBestseller[] = [];

    const categories = await this.categoryService.findAll();

    const { browser, page } = await createBrowser();

    this.logger.log('Scraping data from amazon.com (US)...');

    for (let category of categories) {
      productsData.length = 0;

      await new Promise((resolve) =>
        setTimeout(resolve, Math.floor(Math.random() * 3000) + 2000),
      );

      this.logger.log(`Currently scraping: ${category.display_name}`);

      try {
        const amazonCategoryProducts =
          await this.scraperService.fetchAmazonDepartmentBestsellers(
            page,
            category.url,
            category.display_name as AmazonCategoryType,
          );

        this.logger.log(
          `Ended scraping ${category.display_name} category with ${amazonCategoryProducts.length} results!`,
        );

        productsData.push(...amazonCategoryProducts);

        this.logger.log(`Updating ${category.display_name} products in DB...`);

        await this.productService.updateCategoryProducts(
          category.id,
          productsData,
        );

        const totalCategoryCredibility = amazonCategoryProducts.reduce(
          (total, prod) => {
            total += prod.credibility;

            return total;
          },
          0,
        );

        await this.categoryService.updateById(category.id, {
          credibility: totalCategoryCredibility,
        });

        this.logger.log(
          `${category.display_name} and products successfully updated!`,
        );
      } catch (error) {
        this.logger.error(
          `Error occurred when trying to scrap ${category.display_name} category!`,
          error,
        );
      }
    }

    browser.close();
    this.logger.log('Scraping data has ended!');

    return productsData;
  }
}
