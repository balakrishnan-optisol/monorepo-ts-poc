import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';

import { CommonModule } from './module/common/common.module';

import { AuthService } from './auth.service';

import { AllExceptionsFilter, DatabaseConnectionFactory } from '@monorepo-ts/common-be';

import { AuthController } from './auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConnectionFactory
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRE_IN') }
      }),
      inject: [ConfigService]
    }),
    CommonModule
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    AuthService
  ]
})
export class AuthModule {}
