import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { users } from '../database/users.schema';
import { eq } from 'drizzle-orm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DRIZZLE } from '../database/database.module';

@Injectable()
export class UsersService {
  constructor(
    @Inject(DRIZZLE) private readonly db: any,
  ) { }

  // ✅ CREATE
  async create(dto: CreateUserDto) {
    const result = await this.db.insert(users).values(dto).returning();
    return result[0];
  }

  // ✅ UPDATE
  async update(id: number, dto: UpdateUserDto) {
    const result = await this.db
      .update(users)
      .set(dto)
      .where(eq(users.id, id))
      .returning();

    if (!result.length) {
      throw new NotFoundException('User not found');
    }

    return result[0];
  }

  // ✅ GET ALL
  async findAll() {
    return this.db.select().from(users);
  }

  // ✅ GET BY ID
  async findOne(id: number) {
    const result = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id));

    if (!result.length) {
      throw new NotFoundException('User not found');
    }

    return result[0];
  }

  // ✅ DELETE
  async remove(id: number) {
    const result = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (!result.length) {
      throw new NotFoundException('User not found');
    }

    return {
      message: 'User deleted successfully',
      data: result[0],
    };
  }
}