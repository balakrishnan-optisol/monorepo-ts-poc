import { IsEnum, IsNumber, IsString } from 'class-validator';

import { UserGenderEnum } from '@monorepo-ts/common';

import { ListDto } from '../common.dto';
import { IsOptional } from '../../decorator';

export class ListUserDto extends ListDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsEnum(UserGenderEnum)
  gender: UserGenderEnum;
}
