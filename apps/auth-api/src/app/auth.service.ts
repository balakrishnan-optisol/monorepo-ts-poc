import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';

import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ILogin, IUser, IUserToken, constants } from '@monorepo-ts/common';
import { Hash, LoginDto, SignupDto } from '@monorepo-ts/common-be';

@Injectable()
export class AuthService {
  constructor(
    @Inject(constants.USER_REPOSITORY)
    private readonly userDao: Repository<IUser>,
    private hash: Hash,
    private jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto): Promise<ILogin> {
    const userData: IUser = await this.checkEmailExists(loginDto.email);
    this.validatePassword(loginDto.password, userData.password);

    const token = this.generateToken(userData);
    const result: ILogin = {
      id: userData.id,
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      mobile_number: userData.mobile_number || '',
      token
    };

    return result;
  }

  async signup(signupDto: SignupDto): Promise<IUser> {
    const where: FindOptionsWhere<IUser> = {
      email: ILike(`${signupDto.email}`)
    };

    const userData: IUser = await this.userDao.findOne({ where });
    if (userData) {
      throw new BadRequestException(constants.USER_EMAIL_ALREADY_EXIST);
    }

    const password = this.hash.hashString(signupDto.password);
    const user: DeepPartial<IUser> = { ...signupDto, password };

    return this.userDao.save(user);
  }

  async checkEmailExists(email: string): Promise<IUser> {
    const where: FindOptionsWhere<IUser> = {
      email: ILike(`${email}`)
    };

    const userData: IUser = await this.userDao.findOne({ where });
    if (!userData) {
      throw new UnauthorizedException(constants.INVALID_EMAIL_ERROR_MESSAGE);
    }

    return userData;
  }

  validatePassword(password: string, passwordHash: string): void {
    const isValid: boolean = this.hash.validateString(password, passwordHash);
    if (!isValid) {
      throw new UnauthorizedException(constants.INVALID_EMAIL_ERROR_MESSAGE);
    }
  }

  generateToken(user: IUser): string {
    const tokenData: IUserToken = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      mobile_number: user.mobile_number || ''
    };

    return this.jwtService.sign(tokenData);
  }
}
