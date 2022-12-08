import { amazonURLs } from '../consts/amazonURLs';
import * as puppeteer from 'puppeteer';
import {
  AmazonCategoryType,
  IAmazonBestseller,
} from '../types/amazonScraperTypes';

export class ScraperManager {
  async fetchAmazonDepartmentBestsellers(
    page: puppeteer.Page,
    url: string,
    department: AmazonCategoryType,
  ) {
    await page.goto(url);

    const resultsSelector = '#gridItemRoot';
    await page.waitForSelector(resultsSelector);

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

          const ratingText =
            generalFaceoutEl
              .querySelector(
                '.p13n-sc-uncoverable-faceout .a-icon-row .a-icon-alt',
              )
              ?.textContent.split(' ')[0] || null;

          const reviewCountText =
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

          const priceText =
            lastRowEl.querySelector(priceSelectorPath)?.textContent || null;

          const currencyText = priceText?.at(0) || '';

          const numberOfOffers =
            lastRowEl
              .querySelector('.a-color-secondary')
              ?.textContent.split(' ')[0] || '1';

          const reviewCount = reviewCountText
            ? Number(reviewCountText.replace(/,/gi, ''))
            : null;

          const price = priceText ? Number(priceText.replace('$', '')) : null;
          const rating = ratingText ? Number(ratingText) : null;
          const credibility = (rating || 1) * (reviewCount || 1);

          return {
            position: Number(position.replace('#', '')),
            category: department,
            name: title,
            url,
            thumbnail,
            rating,
            reviewCount,
            price,
            credibility,
            numberOfOffers: Number(numberOfOffers),
            currency: currencyText,
          } as IAmazonBestseller;
        });
      },
      { resultsSelector, department },
    );

    return content;
  }
}
