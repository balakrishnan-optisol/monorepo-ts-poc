import { IsNumber } from 'class-validator';

import { IsOptional } from '../decorator';

export class ListDto {
  @IsOptional()
  @IsNumber()
  page: number;
}
