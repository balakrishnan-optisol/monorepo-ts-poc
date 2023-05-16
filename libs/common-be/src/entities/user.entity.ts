import { Column, Entity } from 'typeorm';

import { UserGenderEnum } from '@monorepo-ts/common';

import { AuditableEntity } from './base.entity';

@Entity({ name: 'user' })
export class UserEntity extends AuditableEntity {
  @Column('varchar', { nullable: false, default: '', length: '46' })
  first_name: string;

  @Column('varchar', { nullable: false, default: '', length: '46' })
  last_name: string;

  @Column('varchar', { nullable: false, default: '', length: '255' })
  email: string;

  @Column('varchar', { nullable: false, length: '72' })
  password: string;

  @Column({
    type: 'enum',
    enum: UserGenderEnum,
    default: UserGenderEnum.OTHERS
  })
  gender: UserGenderEnum;

  @Column('varchar', { nullable: true, length: '16' })
  mobile_number: string;
}
