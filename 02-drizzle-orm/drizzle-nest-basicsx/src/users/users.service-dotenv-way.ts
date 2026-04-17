import { Injectable } from '@nestjs/common';
import { db } from '../database/db'; 
import { users } from '../database/users.schema';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  async create(dto: CreateUserDto) {
    const result = await db
      .insert(users)
      .values(dto)
      .returning();

    return result[0]; // DB response
  }

  async update(id: number, dto: UpdateUserDto) {
    const result = await db
      .update(users)
      .set(dto)
      .where(eq(users.id, id))
      .returning();

    return result[0];
  }

  async findAll() {
    return db.select().from(users);
  }
}
//-----------------------------------------------------