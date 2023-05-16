import { Controller, Delete, Get, Param, Query } from '@nestjs/common';

import { UsersService } from './user.service';

import { IListInterface, IUser } from '@monorepo-ts/common';
import { Authenticated, ListUserDto } from '@monorepo-ts/common-be';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Authenticated()
  list(@Query() listUserDto: ListUserDto): Promise<IListInterface<IUser>> {
    return this.usersService.list(listUserDto);
  }

  @Delete(':id')
  @Authenticated()
  delete(@Param('id') id: number): Promise<boolean> {
    return this.usersService.delete(id);
  }
}
