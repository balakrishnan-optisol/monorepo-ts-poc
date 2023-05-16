import { FindManyOptions, FindOptionsWhere, ILike, Repository } from 'typeorm';

import { Inject, Injectable } from '@nestjs/common';

import { FindAndCount, IListInterface, IUser, constants, userListSelect } from '@monorepo-ts/common';
import { ListUserDto } from '@monorepo-ts/common-be';

@Injectable()
export class UsersService {
  constructor(
    @Inject(constants.USER_REPOSITORY)
    private readonly userDao: Repository<IUser>
  ) {}

  async list(listUserDto: ListUserDto): Promise<IListInterface<IUser>> {
    const where: FindOptionsWhere<IUser> = {};
    if (listUserDto.first_name) {
      where.first_name = ILike(`%${listUserDto.first_name}%`);
    }

    if (listUserDto.last_name) {
      where.last_name = ILike(`%${listUserDto.last_name}%`);
    }

    if (listUserDto.email) {
      where.email = ILike(`%${listUserDto.email}%`);
    }

    if (listUserDto.gender) {
      where.gender = listUserDto.gender;
    }

    const page: number = listUserDto?.page || 1;
    const offset: number = (page - 1) * constants.PAGE_LIMIT;
    const find: FindManyOptions<IUser> = {
      where,
      select: userListSelect,
      skip: offset,
      take: constants.PAGE_LIMIT,
      order: { id: 'DESC' }
    };

    const [list, totalItemCount]: FindAndCount<IUser> = await this.userDao.findAndCount(find);

    const result: IListInterface<IUser> = {
      list,
      total_item_count: totalItemCount,
      limit: constants.PAGE_LIMIT
    };

    return result;
  }

  async delete(id: number): Promise<boolean> {
    const { affected } = await this.userDao.softDelete({ id });
    return affected > 0;
  }
}
