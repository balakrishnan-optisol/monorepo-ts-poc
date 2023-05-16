import { applyDecorators, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../guard/auth.guard';

export const Authenticated = () => applyDecorators(UseGuards(AuthGuard));
