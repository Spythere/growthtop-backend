import { ApiProperty } from '@nestjs/swagger';

export class GetCategoriesResponse {
  @ApiProperty({ example: 'Electronics' })
  category: string;
  @ApiProperty({ example: 'Electronics' })
  category_name: string;
  @ApiProperty({ example: 30 })
  count: number;
}
