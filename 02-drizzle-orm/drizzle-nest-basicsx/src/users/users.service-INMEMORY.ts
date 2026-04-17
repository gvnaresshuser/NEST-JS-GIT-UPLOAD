import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(dto: CreateUserDto): User {
    const user: User = {
      id: Date.now(),
      ...dto,
    };

    this.users.push(user);
    return user;
  }

  update(id: number, dto: UpdateUserDto): User {
    const user = this.users.find(u => u.id === id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, dto);
    return user;
  }
}
//-----------------------------------------------------
/* import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
 */