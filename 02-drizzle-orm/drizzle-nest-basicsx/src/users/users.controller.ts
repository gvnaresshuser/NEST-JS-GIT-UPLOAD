import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

//you can safely delete the entities folder 
// if you're using Drizzle ORM instead of TypeORM.

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // ✅ CREATE
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  // ✅ GET ALL
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // ✅ GET BY ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // ✅ UPDATE
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.usersService.update(id, dto);
  }

  // ✅ DELETE
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
//-----------------------------------------------------------------------