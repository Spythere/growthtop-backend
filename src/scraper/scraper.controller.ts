import { Controller } from '@nestjs/common';
import { amazonURLs } from '../consts/amazonURLs';
import { ProductService } from '../products/products.service';
import {
  AmazonCategoryType,
  IAmazonBestseller,
} from '../types/amazonScraperTypes';

import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(
    private readonly scraperService: ScraperService,
    private readonly productService: ProductService,
  ) {
    this.fetchPageData();
  }

  async fetchPageData() {
    const products: IAmazonBestseller[] = [];

    // for (let category in amazonURLs) {
    const categoryProducts =
      await this.scraperService.fetchAmazonDepartmentBestsellers(
        'Electronics' as AmazonCategoryType,
      );

    // console.log(`Pobrano produkty dla kategorii "${category}"`);

    products.push(...categoryProducts);
    // }

    this.productService.createOrUpdateProducts(products);
  }
}
