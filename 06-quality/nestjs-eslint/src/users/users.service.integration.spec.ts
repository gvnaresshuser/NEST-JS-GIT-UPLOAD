import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { db } from '../db/drizzle';
import { users } from '../db/schema';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('UsersService (Integration)', () => {
  let service: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    // 🧹 Clean DB after each test
    await db.delete(users);
  });

  //-------------------------------------------
  // ✅ CREATE USER
  //-------------------------------------------
  it('should create user with hashed password', async () => {
    const user = await service.create({
      name: 'Test User',
      email: 'test@mail.com',
      password: '1234',
    });

    expect(user).toBeDefined();
    expect(user.email).toBe('test@mail.com');

    // password should be hashed (not plain)
    expect(user.password).not.toBe('1234');
  });

  //-------------------------------------------
  // ✅ LOGIN SUCCESS
  //-------------------------------------------
  it('should login successfully and return token', async () => {
    await service.create({
      name: 'Login User',
      email: 'login@mail.com',
      password: '1234',
    });

    const result = await service.login('login@mail.com', '1234');

    expect(result.token).toBeDefined();
    expect(result.user.email).toBe('login@mail.com');
  });

  //-------------------------------------------
  // ❌ LOGIN FAILURE
  //-------------------------------------------
  it('should throw error for invalid password', async () => {
    await service.create({
      name: 'Test',
      email: 'fail@mail.com',
      password: '1234',
    });

    await expect(service.login('fail@mail.com', 'wrongpass')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  //-------------------------------------------
  // ✅ FIND ALL
  //-------------------------------------------
  it('should return all users', async () => {
    await service.create({
      name: 'User1',
      email: 'u1@mail.com',
      password: '1234',
    });

    const usersList = await service.findAll();

    expect(usersList.length).toBeGreaterThan(0);
  });

  //-------------------------------------------
  // ✅ FIND ONE
  //-------------------------------------------
  it('should return a single user', async () => {
    const user = await service.create({
      name: 'Single User',
      email: 'single@mail.com',
      password: '1234',
    });

    const result = await service.findOne(user.id);

    expect(result.id).toBe(user.id);
  });

  //-------------------------------------------
  // ❌ FIND ONE NOT FOUND
  //-------------------------------------------
  it('should throw NotFoundException if user not found', async () => {
    await expect(service.findOne(9999)).rejects.toThrow(NotFoundException);
  });

  //-------------------------------------------
  // ✅ DELETE USER
  //-------------------------------------------
  it('should delete user', async () => {
    const user = await service.create({
      name: 'Delete User',
      email: 'delete@mail.com',
      password: '1234',
    });

    const deleted = await service.remove(user.id);

    expect(deleted.id).toBe(user.id);

    const allUsers = await service.findAll();
    expect(allUsers.length).toBe(0);
  });
  //-------------------------
  afterAll(async () => {
    // Close DB connection (IMPORTANT)
    await db.$client?.end?.(); // depending on your drizzle setup
  });
  //-------------------------
});
/*
//START STUDIO:
--------------
Microsoft Windows [Version 10.0.26100.8039]
(c) Microsoft Corporation. All rights reserved.

E:\MURALI\NEST-JS\testproj>pnpm db:studio

> testproj@0.0.1 db:studio E:\MURALI\NEST-JS\testproj
> pnpm drizzle-kit studio

No config path provided, using default 'drizzle.config.ts'
Reading config file 'E:\MURALI\NEST-JS\testproj\drizzle.config.ts'
Using 'pg' driver for database querying

 Warning  Drizzle Studio is currently in Beta. If you find anything that is not working as expected or should be improved, feel free to create an issue on GitHub: https://github.com/drizzle-team/drizzle-kit-mirror/issues/new or write to us on Discord: https://discord.gg/WcRKz2FFxN

Drizzle Studio is up and running on https://local.drizzle.studio

OPEN THIS IN CHROME BROWSER:
---------------------------
 https://local.drizzle.studio

================================================================================

E:\MURALI\NEST-JS\testproj>pnpm jest src/users/users.service.integration.spec.ts
  console.log
    DB URL: postgresql://pern_store_user:vKYBVwPxADEKfk5ibKG0fieFsSGm2IE2@dpg-d6slnslm5p6s73atcljg-a.singapore-postgres.render.com/perns_store_r9l1?sslmode=verify-full

      at Object.<anonymous> (db/drizzle.ts:5:9)

  console.log
    USER: { name: 'Test User', email: 'test@mail.com', password: '1234' }

      at UsersService.create (users/users.service.ts:16:17)

  console.log
    USER: { name: 'Login User', email: 'login@mail.com', password: '1234' }

      at UsersService.create (users/users.service.ts:16:17)

  console.log
    [SERVICE] - login

      at UsersService.login (users/users.service.ts:34:17)

  console.log
    DB User: {
      id: 5,
      name: 'Login User',
      email: 'login@mail.com',
      password: '$2b$10$sPceXaicauQpFjrbaRKzQeE0sy6cLiTOC4pMahqH35XpzpINHPk0O'
    }

      at UsersService.login (users/users.service.ts:48:17)

  console.log
    Password Match: true

      at UsersService.login (users/users.service.ts:58:17)

  console.log
    USER: { name: 'Test', email: 'fail@mail.com', password: '1234' }

      at UsersService.create (users/users.service.ts:16:17)

  console.log
    [SERVICE] - login

      at UsersService.login (users/users.service.ts:34:17)

  console.log
    DB User: {
      id: 6,
      name: 'Test',
      email: 'fail@mail.com',
      password: '$2b$10$MRv3YANGSgTzxJe3K2dxU.2VYZsECeF6LG1mgDLEvhDe647MVScLS'
    }

      at UsersService.login (users/users.service.ts:48:17)

  console.log
    Password Match: false

      at UsersService.login (users/users.service.ts:58:17)

  console.log
    USER: { name: 'User1', email: 'u1@mail.com', password: '1234' }

      at UsersService.create (users/users.service.ts:16:17)

  console.log
    USER: { name: 'Single User', email: 'single@mail.com', password: '1234' }

      at UsersService.create (users/users.service.ts:16:17)

  console.log
    USER: { name: 'Delete User', email: 'delete@mail.com', password: '1234' }

      at UsersService.create (users/users.service.ts:16:17)

 PASS  src/users/users.service.integration.spec.ts (43.556 s)
  UsersService (Integration)
    √ should create user with hashed password (2323 ms)
    √ should login successfully and return token (370 ms)
    √ should throw error for invalid password (381 ms)
    √ should return all users (275 ms)
    √ should return a single user (268 ms)
    √ should throw NotFoundException if user not found (128 ms)
    √ should delete user (334 ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        49.4 s
Ran all test suites matching src/users/users.service.integration.spec.ts.
Jest did not exit one second after the test run has completed.

'This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.

E:\MURALI\NEST-JS\testproj>
*/
