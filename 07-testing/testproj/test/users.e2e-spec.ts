import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { db } from '../src/db/drizzle';
import { users } from '../src/db/schema';

//pnpm test:e2e
//E:\MURALI\NEST-JS\testproj\test\users.e2e-spec.ts
//pnpm exec jest --config ./test/jest-e2e.json test/users.e2e-spec.ts

describe('UsersController (E2E)', () => {
  let app: INestApplication;
  let token: string;
  let userId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // 🔥 full app
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await db.delete(users);
  });

  afterAll(async () => {
    console.log(db);
    console.log(Object.keys(db));
    await db.$client?.end?.();
    await app.close();
  });

  //-------------------------------------------
  // ✅ CREATE USER
  //-------------------------------------------
  it('POST /users → create user', async () => {
    const res = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'E2E User',
        email: 'e2e@mail.com',
        password: '1234',
      })
      .expect(201);

    expect(res.body.email).toBe('e2e@mail.com');
    userId = res.body.id;
  });

  //-------------------------------------------
  // ✅ LOGIN
  //-------------------------------------------
  it('POST /users/login → get token', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Login User',
        email: 'login@mail.com',
        password: '1234',
      });

    const res = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'login@mail.com',
        password: '1234',
      })
      .expect(201); // sometimes 200 depending on setup

    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  //-------------------------------------------
  // ❌ LOGIN FAIL
  //-------------------------------------------
  it('POST /users/login → fail', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Fail User',
        email: 'fail@mail.com',
        password: '1234',
      });

    await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'fail@mail.com',
        password: 'wrong',
      })
      .expect(401);
  });

  //-------------------------------------------
  // ✅ GET ALL
  //-------------------------------------------
  it('GET /users → get all users', async () => {
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'User1',
        email: 'u1@mail.com',
        password: '1234',
      });

    const res = await request(app.getHttpServer())
      .get('/users')
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0);
  });

  //-------------------------------------------
  // ✅ JWT PROTECTED ROUTE
  //-------------------------------------------
  it('GET /users/secure → requires token', async () => {
    // ✅ Create user
    await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Secure User',
        email: 'secure@mail.com',
        password: '1234',
      });

    // ✅ Login to get token
    const loginRes = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'secure@mail.com',
        password: '1234',
      });

    const token = loginRes.body.token;

    // ❌ Without token → should fail
    await request(app.getHttpServer())
      .get('/users/secure')
      .expect(401);

    // ✅ With token → should pass
    const res = await request(app.getHttpServer())
      .get('/users/secure')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0);
  });

  //-------------------------------------------
  // ✅ GET BY ID (JWT)
  //-------------------------------------------
  it('GET /users/:id → with JWT', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Single',
        email: 'single@mail.com',
        password: '1234',
      });

    const loginRes = await request(app.getHttpServer())
      .post('/users/login')
      .send({
        email: 'single@mail.com',
        password: '1234',
      });

    const token = loginRes.body.token;

    const res = await request(app.getHttpServer())
      .get(`/users/${createRes.body.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(res.body.id).toBe(createRes.body.id);
  });

  //-------------------------------------------
  // ✅ DELETE
  //-------------------------------------------
  it('DELETE /users/:id', async () => {
    const createRes = await request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'Delete',
        email: 'delete@mail.com',
        password: '1234',
      });

    await request(app.getHttpServer())
      .delete(`/users/${createRes.body.id}`)
      .expect(200);
  });
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

pnpm test:e2e

E:\MURALI\NEST-JS\testproj>pnpm test:e2e

> testproj@0.0.1 test:e2e E:\MURALI\NEST-JS\testproj
> jest --config ./test/jest-e2e.json

 PASS  test/app.e2e-spec.ts
  ● Console

    console.log
      DB URL: postgresql://pern_store_user:vKYBVwPxADEKfk5ibKG0fieFsSGm2IE2@dpg-d6slnslm5p6s73atcljg-a.singapore-postgres.render.com/perns_store_r9l1?sslmode=verify-full

      at Object.<anonymous> (../src/db/drizzle.ts:5:9)

    console.log
      [GET] / - 4ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

 PASS  test/users.e2e-spec.ts (7.311 s)
  ● Console

    console.log
      DB URL: postgresql://pern_store_user:vKYBVwPxADEKfk5ibKG0fieFsSGm2IE2@dpg-d6slnslm5p6s73atcljg-a.singapore-postgres.render.com/perns_store_r9l1?sslmode=verify-full

      at Object.<anonymous> (../src/db/drizzle.ts:5:9)

    console.log
      USER: { name: 'E2E User', email: 'e2e@mail.com', password: '1234' }

      at UsersService.create (../src/users/users.service.ts:16:17)

    console.log
      [POST] /users - 1689ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      USER: { name: 'Login User', email: 'login@mail.com', password: '1234' }

      at UsersService.create (../src/users/users.service.ts:16:17)

    console.log
      [POST] /users - 143ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      [SERVICE] - login

      at UsersService.login (../src/users/users.service.ts:34:17)

    console.log
      DB User: {
        id: 40,
        name: 'Login User',
        email: 'login@mail.com',
        password: '$2b$10$p9A4peClTBgb35gsLcUXieis20gIu4nAnrzcwn/dj2VdhZ16.Wgge'
      }

      at UsersService.login (../src/users/users.service.ts:48:17)

    console.log
      Password Match: true

      at UsersService.login (../src/users/users.service.ts:58:17)

    console.log
      [POST] /users/login - 158ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      USER: { name: 'Fail User', email: 'fail@mail.com', password: '1234' }

      at UsersService.create (../src/users/users.service.ts:16:17)

    console.log
      [POST] /users - 167ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      [SERVICE] - login

      at UsersService.login (../src/users/users.service.ts:34:17)

    console.log
      DB User: {
        id: 41,
        name: 'Fail User',
        email: 'fail@mail.com',
        password: '$2b$10$PZ4dDoYev9lZVGFFxAPKqui00iLdtLzYpf.vqsDlx1aDqyyB5AOGu'
      }

      at UsersService.login (../src/users/users.service.ts:48:17)

    console.log
      Password Match: false

      at UsersService.login (../src/users/users.service.ts:58:17)

    console.log
      [POST] /users/login - 155ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      USER: { name: 'User1', email: 'u1@mail.com', password: '1234' }

      at UsersService.create (../src/users/users.service.ts:16:17)

    console.log
      [POST] /users - 159ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      [GET] /users - 74ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      USER: { name: 'Secure User', email: 'secure@mail.com', password: '1234' }

      at UsersService.create (../src/users/users.service.ts:16:17)

    console.log
      [POST] /users - 141ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      [SERVICE] - login

      at UsersService.login (../src/users/users.service.ts:34:17)

    console.log
      DB User: {
        id: 43,
        name: 'Secure User',
        email: 'secure@mail.com',
        password: '$2b$10$3W78Atn950TV/p9RCMLWhuwkFdDhLMgKrBJGWsvjIsfssDrfrobEy'
      }

      at UsersService.login (../src/users/users.service.ts:48:17)

    console.log
      Password Match: true

      at UsersService.login (../src/users/users.service.ts:58:17)

    console.log
      [POST] /users/login - 145ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      Incoming Request Headers: {
        host: '127.0.0.1:57489',
        'accept-encoding': 'gzip, deflate',
        connection: 'close'
      }

      at JwtAuthGuard.canActivate (../src/users/guards/jwt-auth/jwt-auth.guard.ts:14:13)

    console.log
      [GET] /users/secure - 6ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      Incoming Request Headers: {
        host: '127.0.0.1:57491',
        'accept-encoding': 'gzip, deflate',
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsIm5hbWUiOiJTZWN1cmUgVXNlciIsImlhdCI6MTc3NTc4OTcxMSwiZXhwIjoxNzc1NzkzMzExfQ.cipGrZ_0yo2gXdzCFyRDK5G3PcTeW2iFkR1Uw_JFsH8',
        connection: 'close'
      }

      at JwtAuthGuard.canActivate (../src/users/guards/jwt-auth/jwt-auth.guard.ts:14:13)

    console.log
      Extracted Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDMsIm5hbWUiOiJTZWN1cmUgVXNlciIsImlhdCI6MTc3NTc4OTcxMSwiZXhwIjoxNzc1NzkzMzExfQ.cipGrZ_0yo2gXdzCFyRDK5G3PcTeW2iFkR1Uw_JFsH8

      at JwtAuthGuard.canActivate (../src/users/guards/jwt-auth/jwt-auth.guard.ts:23:13)

    console.log
      Decoded Token: { id: 43, name: 'Secure User', iat: 1775789711, exp: 1775793311 }

      at JwtAuthGuard.canActivate (../src/users/guards/jwt-auth/jwt-auth.guard.ts:27:15)

    console.log
      [GET] /users/secure - 77ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      USER: { name: 'Single', email: 'single@mail.com', password: '1234' }

      at UsersService.create (../src/users/users.service.ts:16:17)

    console.log
      [POST] /users - 141ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      [SERVICE] - login

      at UsersService.login (../src/users/users.service.ts:34:17)

    console.log
      DB User: {
        id: 44,
        name: 'Single',
        email: 'single@mail.com',
        password: '$2b$10$p9.BpL/ph5/r.cZlK9oQzusygDNis4b/Bfh.4apMoJ1WWPvJGY7iW'
      }

      at UsersService.login (../src/users/users.service.ts:48:17)

    console.log
      Password Match: true

      at UsersService.login (../src/users/users.service.ts:58:17)

    console.log
      [POST] /users/login - 144ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      Incoming Request Headers: {
        host: '127.0.0.1:57497',
        'accept-encoding': 'gzip, deflate',
        authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsIm5hbWUiOiJTaW5nbGUiLCJpYXQiOjE3NzU3ODk3MTEsImV4cCI6MTc3NTc5MzMxMX0.va58cJeno7kghQnWHmn1JPaNCl0seCvMtFQFWL5LItA',
        connection: 'close'
      }

      at JwtAuthGuard.canActivate (../src/users/guards/jwt-auth/jwt-auth.guard.ts:14:13)

    console.log
      Extracted Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDQsIm5hbWUiOiJTaW5nbGUiLCJpYXQiOjE3NzU3ODk3MTEsImV4cCI6MTc3NTc5MzMxMX0.va58cJeno7kghQnWHmn1JPaNCl0seCvMtFQFWL5LItA

      at JwtAuthGuard.canActivate (../src/users/guards/jwt-auth/jwt-auth.guard.ts:23:13)

    console.log
      Decoded Token: { id: 44, name: 'Single', iat: 1775789711, exp: 1775793311 }

      at JwtAuthGuard.canActivate (../src/users/guards/jwt-auth/jwt-auth.guard.ts:27:15)

    console.log
      [GET] /users/44 - 71ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      USER: { name: 'Delete', email: 'delete@mail.com', password: '1234' }

      at UsersService.create (../src/users/users.service.ts:16:17)

    console.log
      [POST] /users - 139ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)

    console.log
      [DELETE] /users/45 - 68ms

      at ServerResponse.<anonymous> (../src/common/middleware/logger.middleware.ts:23:13)


Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        8.524 s, estimated 61 s
Ran all test suites.

E:\MURALI\NEST-JS\testproj>
*/