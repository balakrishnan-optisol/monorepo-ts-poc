import { IsAlpha, IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { UserGenderEnum, constants } from '@monorepo-ts/common';

import { ListDto } from '../common.dto';
import { IsOptional, ValidatePassword } from '../../decorator';

export class SignupDto extends ListDto {
  @IsNotEmpty()
  @IsAlpha('en-IN', {
    message: constants.FIRST_NAME_ERROR_MESSAGE
  })
  first_name: string;

  @IsNotEmpty()
  @IsAlpha('en-IN', {
    message: constants.LAST_NAME_ERROR_MESSAGE
  })
  last_name: string;

  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: constants.VALID_EMAIL_ERROR_MESSAGE
    }
  )
  email: string;

  @ValidatePassword()
  password: string;

  @IsNotEmpty()
  @IsEnum(UserGenderEnum)
  gender: UserGenderEnum;

  @IsOptional()
  @IsString()
  mobile_number: string;
}
