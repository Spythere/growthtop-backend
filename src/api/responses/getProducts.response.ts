import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class GetProductsResponse {
  @ApiProperty({ example: 'Electronics' })
  category: string;

  @ApiProperty({ example: 'Electronics' })
  category_name: string;

  @ApiProperty({ example: 'Electronics_1' })
  product_id: string;

  @ApiProperty({ example: new Date() })
  refreshed_at: Date;

  @ApiProperty({ example: 1 })
  position: number;

  @ApiProperty({ example: 'Bestseller product name' })
  name: string;

  @ApiProperty({ example: 'https://www.amazon.com' })
  url: string;

  @ApiProperty({ example: 4.6 })
  @IsOptional()
  rating?: number;

  @ApiProperty({ example: 120 })
  @IsOptional()
  reviewCount?: number;

  @ApiProperty({ example: 'https://www.amazon.com' })
  thumbnail: string;

  @ApiProperty({ example: 21.37 })
  price: number;

  @ApiProperty({ example: '$' })
  currency?: string;

  @ApiProperty({ example: 5 })
  numberOfOffers: number;
}
