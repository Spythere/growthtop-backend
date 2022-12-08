import { IAmazonBestseller } from '../../types/amazonScraperTypes';

export class BestsellerCollection {
  private readonly bestsellers: IAmazonBestseller[];

  constructor(bestsellers: IAmazonBestseller[]) {
    this.bestsellers = bestsellers;
  }

  private _collectionDictionary(): { [key: string]: IAmazonBestseller[] } {
    return this.bestsellers.reduce((acc, product) => {
      if (product.category in acc) acc[product.category].push(product);
      else acc[product.category] = [product];

      return acc;
    }, {} as { [key: string]: IAmazonBestseller[] });
  }

  categoryCredibilties(): { [key: string]: number } {
    const bestsellersByCategory = this._collectionDictionary();

    let maxCategoryCred = 0;
    let categoryCredibilities: { [key: string]: number } = {};

    for (let categoryKeyName in bestsellersByCategory) {
      console.log(categoryKeyName);

      const categoryBestsellers = bestsellersByCategory[categoryKeyName];

      const categoryCredibility = categoryBestsellers.reduce(
        (avg, bestseller) => {
          if (!bestseller.rating) return avg;

          avg += (bestseller.reviewCount || 0) / bestseller.rating;

          return avg;
        },
        0,
      );

      categoryCredibilities[categoryKeyName] = categoryCredibility;

      if (categoryCredibility > maxCategoryCred)
        maxCategoryCred = categoryCredibility;
    }

    for (let categoryKeyName in categoryCredibilities) {
      categoryCredibilities[categoryKeyName] /= maxCategoryCred;
    }

    return categoryCredibilities;
  }
}
