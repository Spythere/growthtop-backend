import { Injectable } from '@nestjs/common';
import {
  AmazonCategoryType,
  IAmazonBestseller,
} from '../types/amazonScraperTypes';
import { connectToURL } from '../utils/webScraperUtils';

import { amazonURLs } from '../consts/amazonURLs';

@Injectable()
export class ScraperService {

  async fetchAmazonDepartmentBestsellers(department: AmazonCategoryType) {
    const { page, browser } = await connectToURL(amazonURLs[department]);

    const resultsSelector = '#gridItemRoot';
    await page.waitForSelector(resultsSelector);

    console.log('Pobrano zawartość!');

    const content: IAmazonBestseller[] = await page.evaluate(
      ({ resultsSelector, department }) => {
        return [...document.querySelectorAll(resultsSelector)].map((item) => {
          const generalFaceoutEl = item.querySelector(
            '.zg-grid-general-faceout',
          );

          const url = (
            item.querySelector('.a-link-normal') as HTMLAnchorElement
          ).href;

          const title = generalFaceoutEl.querySelector(
            'div > a:nth-child(2) > span > div',
          ).textContent;

          const position = item.querySelector('.zg-bdg-text').textContent;

          const rating =
            generalFaceoutEl
              .querySelector(
                '.p13n-sc-uncoverable-faceout .a-icon-row .a-icon-alt',
              )
              ?.textContent.split(' ')[0] || null;

          const reviewCount =
            generalFaceoutEl.querySelector(
              '.p13n-sc-uncoverable-faceout .a-icon-row .a-size-small',
            )?.textContent || null;

          const thumbnail =
            (
              generalFaceoutEl.querySelector(
                'div > a > div > img',
              ) as HTMLImageElement
            )?.src || null;

          // Last row with offers & price
          const lastRowEl = generalFaceoutEl.querySelector(
            'div > .a-row:last-child',
          );

          const priceSelectorPath = lastRowEl.querySelector('.p13n-sc-price')
            ? 'a > span > span > span'
            : 'div > div > a > div > span > span';

          const price =
            lastRowEl.querySelector(priceSelectorPath)?.textContent || null;

          const currency = price?.at(0) || '';

          const numberOfOffers =
            lastRowEl
              .querySelector('.a-color-secondary')
              ?.textContent.split(' ')[0] || '1';

          return {
            position: Number(position.replace('#', '')),
            category: department,
            name: title,
            url,
            thumbnail,
            rating: rating ? Number(rating) : null,
            reviewCount: reviewCount
              ? Number(reviewCount.replace(/,/gi, ''))
              : null,
            price: price ? Number(price.replace('$', '')) : null,
            numberOfOffers: Number(numberOfOffers),
            currency,
          };
        });
      },
      { resultsSelector, department },
    );

    await browser.close();

    return content;
  }
}
