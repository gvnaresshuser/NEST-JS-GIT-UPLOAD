import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { db } from '../db/drizzle';
import { users } from '../db/schema';
import { eq, ilike } from 'drizzle-orm';
import { User } from './interface/user.interface';
import { signToken } from '../common/utils/jwt.util';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  async create(user: Omit<User, 'id'>) {
    //id is OMITTED...check user.
    //async create(user: User) {
    console.warn('USER:', user);

    // ✅ hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const result = await db
      .insert(users)
      .values({
        ...user,
        password: hashedPassword,
      })
      .returning();

    return result[0];
  }

  //-----------------------------------------------
  // ✅ LOGIN SERVICE
  //-----------------------------------------------
  // ✅ LOGIN SERVICE
  async login(email: string, password: string) {
    console.warn('[SERVICE] - login');

    // 1. Find user by email
    const result = await db.select().from(users).where(eq(users.email, email));

    const user = result[0];

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    console.warn('DB User:', user);

    // ✅ IMPORTANT FIX
    if (!user.password) {
      throw new UnauthorizedException('Password not set');
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    console.warn('Password Match:', isMatch);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid password');
    }

    // 3. Generate JWT
    const token = signToken({
      id: user.id,
      name: user.name ?? '', // handle null safety
    });

    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  //-----------------------------------------------

  async findAll() {
    return await db.select().from(users);
  }

  async findOne(id: number) {
    const result = await db.select().from(users).where(eq(users.id, id));

    const user = result[0];

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
    //OMITTING PASSWORD - NOT GOOD PRACTICE TO RETURN PASSWORDS
    /*  const { password, ...safeUser } = user;
         return safeUser; */
  }

  async remove(id: number) {
    const result = await db.delete(users).where(eq(users.id, id)).returning();
    return result[0];
  }
  //-----------------------------------------------
  //http://localhost:3000/users/search?search=na
  async findAllFiltered(search?: string) {
    console.warn('Search Query:', search); // Debugging log
    /* return db
            .select()
            .from(users)
            .where(ilike(users.name, `%${search}%`)); */
    //------------------------------------------
    const result = await db
      .select()
      .from(users)
      .where(ilike(users.name, `%${search}%`));

    //return result.map(({ password, ...user }) => user);
    return result.map(({ password: _password, ...user }) => user);
  }
}
//E:\MURALI\NEST-JS\nestjs-eslint\src\users\users.service.ts
//pnpm exec eslint src/users/users.service.ts
