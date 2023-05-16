import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { LoginDto, SignupDto } from '@monorepo-ts/common-be';
import { ILogin, IUser } from '@monorepo-ts/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<ILogin> {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  signup(@Body() signupDto: SignupDto): Promise<IUser> {
    return this.authService.signup(signupDto);
  }
}
