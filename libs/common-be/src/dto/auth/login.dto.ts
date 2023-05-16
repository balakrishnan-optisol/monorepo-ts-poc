import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

import { constants } from '@monorepo-ts/common';

import { ListDto } from '../common.dto';

export class LoginDto extends ListDto {
  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: constants.VALID_EMAIL_ERROR_MESSAGE
    }
  )
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  @IsString()
  password: string;
}
