import { IsString } from 'class-validator';

export class GetProductsDto {
  @IsString()
  category: string;
}
