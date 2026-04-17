import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { db } from '../db/drizzle';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from '@nestjs/common';
import { signToken } from '../common/utils/jwt.util';
import { UnauthorizedException } from '@nestjs/common';

//---------------- MOCK DB --------------------
// ✅ MOCK DRIZZLE
jest.mock('../db/drizzle', () => ({
  db: {
    select: jest.fn(),
    insert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));
//---------------- MOCK DB --------------------
jest.mock('bcrypt', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
//-------------------------------------------
jest.mock('../common/utils/jwt.util', () => ({
  signToken: jest.fn(),
}));
//-------------------------------------------
describe('UsersService - Step 1', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  //🚀 STEP 1 — Test create()
  it('should create user', async () => {
    const mockUser = {
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    };

    (jest.spyOn(bcrypt, 'hash') as jest.Mock).mockResolvedValue('hashed_password');

    (db.insert as jest.Mock).mockReturnValue({
      values: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([
          { ...mockUser, password: 'hashed_password' },
        ]),
      }),
    });

    const result = await service.create(mockUser);

    expect(result.password).toBe('hashed_password');
  });
  //=====================================================================
  //🚀 STEP 2 — Test findAll()
  it('should return all users', async () => {
    const mockUsers = [
      { id: 1, name: 'John', email: 'john@example.com', password: 'hashed' },
      { id: 2, name: 'Jane', email: 'jane@example.com', password: 'hashed' },
    ];

    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockResolvedValue(mockUsers),
    });

    const result = await service.findAll();

    expect(result).toEqual(mockUsers);
  });
  //=====================================================================
  //🚀 STEP 3 — Test findOne(id)
  //🧪 TEST 1 — Success Case ✅
  it('should return user by id', async () => {
    const mockUser = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'hashed',
    };

    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([mockUser]),
      }),
    });

    const result = await service.findOne(1);

    expect(result).toEqual(mockUser);
  });
  //----------------------------------
  //TEST 2 — Not Found Case ❌
  it('should throw NotFoundException if user not found', async () => {
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([]),
      }),
    });

    await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
  });
  //=====================================================================
  //🚀 STEP 4 — Test remove(id)
  it('should delete user by id', async () => {
    const mockDeletedUser = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'hashed',
    };

    (db.delete as jest.Mock).mockReturnValue({
      where: jest.fn().mockReturnValue({
        returning: jest.fn().mockResolvedValue([mockDeletedUser]),
      }),
    });

    const result = await service.remove(1);

    expect(result).toEqual(mockDeletedUser);
  });
  //=====================================================================
  //🚀 STEP 5 — Test login(email, password)
  //🧪 TEST 1 — Successful Login ✅
  it('should login successfully', async () => {
    const mockUser = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'hashed_password',
    };

    // ✅ Mock DB
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([mockUser]),
      }),
    });

    // ✅ Mock bcrypt compare
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    // ✅ Mock JWT
    (signToken as jest.Mock).mockReturnValue('mock_token');

    const result = await service.login('john@example.com', '123456');

    expect(result).toEqual({
      message: 'Login successful',
      token: 'mock_token',
      user: {
        id: 1,
        name: 'John',
        email: 'john@example.com',
      },
    });
  });
  //----------------------------------
  //🧪 TEST 2 — Invalid Email ❌
  it('should throw error if email not found', async () => {
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([]),
      }),
    });

    await expect(
      service.login('wrong@example.com', '123456'),
    ).rejects.toThrow(UnauthorizedException);
  });
  //----------------------------------
  //🧪 TEST 3 — Password Not Set ❌
  it('should throw error if password not set', async () => {
    const mockUser = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: null,
    };

    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([mockUser]),
      }),
    });

    await expect(
      service.login('john@example.com', '123456'),
    ).rejects.toThrow('Password not set');
  });
  //----------------------------------
  //🧪 TEST 4 — Invalid Password ❌
  it('should throw error if password is invalid', async () => {
    const mockUser = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'hashed_password',
    };

    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([mockUser]),
      }),
    });

    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      service.login('john@example.com', 'wrongpassword'),
    ).rejects.toThrow(UnauthorizedException);
  });
  //=====================================================================
  //🚀 STEP 6 — Test findAllFiltered(search)
  //🧪 TEST 1 — Should filter and remove password ✅
  it('should return filtered users without password', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'Narresh',
        email: 'narresh@example.com',
        password: 'hashed1',
      },
      {
        id: 2,
        name: 'Naresh Kumar',
        email: 'naresh@example.com',
        password: 'hashed2',
      },
    ];

    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue(mockUsers),
      }),
    });

    const result = await service.findAllFiltered('na');

    expect(result).toEqual([
      {
        id: 1,
        name: 'Narresh',
        email: 'narresh@example.com',
      },
      {
        id: 2,
        name: 'Naresh Kumar',
        email: 'naresh@example.com',
      },
    ]);
  });
  //----------------------------------
  //🧪 TEST 2 — Empty Result Case
  it('should return empty array if no users match search', async () => {
    (db.select as jest.Mock).mockReturnValue({
      from: jest.fn().mockReturnValue({
        where: jest.fn().mockResolvedValue([]),
      }),
    });

    const result = await service.findAllFiltered('xyz');

    expect(result).toEqual([]);
  });
  //=====================================================================
  //=====================================================================
  //=====================================================================
  //=====================================================================
  //=====================================================================
  //=====================================================================
  //=====================================================================
  //=====================================================================
  //=====================================================================

});

//---------------------------------------------------------------------
//TEST-RESULT
/*
pnpm exec jest src/users/users.controller.spec.ts

E:\MURALI\NEST-JS\testproj>pnpm exec jest src/users/users.service.spec.ts
  console.log
    USER: { name: 'John', email: 'john@example.com', password: '123456' }

      at UsersService.create (users/users.service.ts:16:17)

  console.log
    [SERVICE] - login

      at UsersService.login (users/users.service.ts:34:17)

  console.log
    DB User: {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'hashed_password'
    }

      at UsersService.login (users/users.service.ts:48:17)

  console.log
    Password Match: true

      at UsersService.login (users/users.service.ts:58:17)

  console.log
    [SERVICE] - login

      at UsersService.login (users/users.service.ts:34:17)

  console.log
    [SERVICE] - login

      at UsersService.login (users/users.service.ts:34:17)

  console.log
    DB User: { id: 1, name: 'John', email: 'john@example.com', password: null }

      at UsersService.login (users/users.service.ts:48:17)

  console.log
    [SERVICE] - login

      at UsersService.login (users/users.service.ts:34:17)

  console.log
    DB User: {
      id: 1,
      name: 'John',
      email: 'john@example.com',
      password: 'hashed_password'
    }

      at UsersService.login (users/users.service.ts:48:17)

  console.log
    Password Match: false

      at UsersService.login (users/users.service.ts:58:17)

  console.log
    Search Query: na

      at UsersService.findAllFiltered (users/users.service.ts:112:17)

  console.log
    Search Query: xyz

      at UsersService.findAllFiltered (users/users.service.ts:112:17)

 PASS  src/users/users.service.spec.ts
  UsersService - Step 1
    √ should create user (47 ms)
    √ should return all users (22 ms)
    √ should return user by id (7 ms)
    √ should throw NotFoundException if user not found (15 ms)
    √ should delete user by id (2 ms)
    √ should login successfully (9 ms)
    √ should throw error if email not found (5 ms)
    √ should throw error if password not set (7 ms)
    √ should throw error if password is invalid (9 ms)
    √ should return filtered users without password (5 ms)
    √ should return empty array if no users match search (8 ms)

Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        1.755 s, estimated 2 s
Ran all test suites matching src/users/users.service.spec.ts.

E:\MURALI\NEST-JS\testproj>
*/
/*
🏆 WHAT YOU HAVE COMPLETED 🎉
You have now tested:
| Function        | Covered |
| --------------- | ------- |
| create          | ✅       |
| findAll         | ✅       |
| findOne         | ✅       |
| remove          | ✅       |
| login           | ✅       |
| findAllFiltered | ✅       |

*/





//---------------------------------------------------------------------

/* import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
 */