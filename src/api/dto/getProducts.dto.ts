import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetProductsDto {
  @ApiProperty({
    type: String,
    description: 'Category name',
    required: true,
  })
  @IsString()
  category: string;
}
