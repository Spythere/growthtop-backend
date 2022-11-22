import * as puppeteer from 'puppeteer';

export const connectToURL = async (url: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  await page.goto(url);

  return { page, browser };
};