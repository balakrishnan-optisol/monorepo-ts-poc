import { MinLength, MaxLength, Matches } from 'class-validator';

import { applyDecorators } from '@nestjs/common';

import { constants } from '@monorepo-ts/common';

export const ValidatePassword = () =>
  applyDecorators(
    MinLength(8),
    MaxLength(30),
    Matches(/(?=.*[a-z])/, {
      message: constants.PASSWORD_LOWERCASE_ERROR_MESSAGE
    }),
    Matches(/(?=.*[A-Z])/, {
      message: constants.PASSWORD_UPPERCASE_ERROR_MESSAGE
    }),
    Matches(/(?=.*\W)/, {
      message: constants.PASSWORD_SYMBOL_ERROR_MESSAGE
    }),
    Matches(/(?=.*\d)/, {
      message: constants.PASSWORD_NUMBER_ERROR_MESSAGE
    })
  );
