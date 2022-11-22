import * as puppeteer from 'puppeteer';

export const connectToURL = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  return { page, browser };
};