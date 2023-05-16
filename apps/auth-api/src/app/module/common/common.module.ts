import { Module } from '@nestjs/common';

import { Hash, JwtStrategy } from '@monorepo-ts/common-be';

import { entityProviders } from './providers';

@Module({
  imports: [],
  providers: [...entityProviders, Hash, JwtStrategy],
  exports: [...entityProviders, Hash, JwtStrategy]
})
export class CommonModule {}
