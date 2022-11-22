import * as puppeteer from 'puppeteer';

export const createBrowser = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  return { browser, page };
};

export const connectToURL = async (page: puppeteer.Page, url: string) => {
  await page.goto(url);

  return { page };
};