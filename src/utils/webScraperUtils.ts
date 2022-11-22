import { products } from '@prisma/client';
import { Types } from 'mongoose';
import * as puppeteer from 'puppeteer';
import { Product } from '../products/interfaces/product.interface';
import { IProduct } from '../types/productTypes';

export const connectToURL = async (url: string) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url);

  return { page, browser };
};