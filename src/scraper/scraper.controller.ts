import { Controller } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { ScraperService } from './scraper.service';

@Controller('scraper')
export class ScraperController {
  constructor(private readonly scraperService: ScraperService) {
    (async () => {
      console.log('Ładowanie strony...');

      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      await page.goto('https://moodle2022.pcz.pl/');
      console.log('Połączono ze stroną');

      const resultsSelector = '#intro > h1';
      await page.waitForSelector(resultsSelector);

      console.log('Pobrano zawartość');

      const content = await page.evaluate((resultsSelector) => {
        return document.querySelector(resultsSelector).textContent;
        // return [...document.querySelectorAll(`${resultsSelector} > a`)].map(
        //   (anchor: HTMLAnchorElement) => {
        //     const title = anchor.textContent;
        //     return `${title} - ${anchor.href}`;
        //   },
        // );
      }, resultsSelector);

      console.log('Pobrana zawartość:', content);
      await browser.close();
    })();
  }

  async fetchPageData() {
    (await this.scraperService.fetchData()).subscribe((o) => {
      const $ = cheerio.load(o.data);

      console.log($.html());
    });
  }
}
