/* import { Controller } from '@nestjs/common';

@Controller('users')
export class UsersController {}
////http://localhost:3000/users - endpoints */
//------------------------------------------------
import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getHello(): string {
      return this.usersService.getHelloUsers();
  }
}