import { DataSource } from 'typeorm';

import { IUser, constants } from '@monorepo-ts/common';
import { UserEntity } from '@monorepo-ts/common-be';

export const entityProviders = [
  {
    provide: constants.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository<IUser>(UserEntity),
    inject: [DataSource]
  }
];
