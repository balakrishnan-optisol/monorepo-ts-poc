import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { APP_FILTER } from '@nestjs/core';

import { CommonModule } from './module/common/common.module';

import { UsersService } from './user.service';

import { AllExceptionsFilter, DatabaseConnectionFactory } from '@monorepo-ts/common-be';

import { UsersController } from './user.controller';

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
  controllers: [UsersController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    UsersService
  ]
})
export class UsersModule {}
