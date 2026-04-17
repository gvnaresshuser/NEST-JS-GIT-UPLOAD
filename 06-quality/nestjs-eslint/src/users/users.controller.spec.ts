import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

// ✅ MOCK GUARD
jest.mock('./guards/jwt-auth/jwt-auth.guard', () => ({
  JwtAuthGuard: jest.fn().mockImplementation(() => ({
    canActivate: jest.fn(() => true),
  })),
}));

describe('UsersController - Step 1', () => {
  let controller: UsersController;

  const mockUsersService = {
    findAll: jest.fn(),
    create: jest.fn(),
    login: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    findAllFiltered: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });
  //===================================================================
  //🧪 STEP 1 — Test findAll()

  it('should return all users', async () => {
    const mockUsers = [{ id: 1, name: 'John', email: 'john@example.com' }];

    mockUsersService.findAll.mockResolvedValue(mockUsers);

    const result = await controller.findAll();

    expect(result).toEqual(mockUsers);
  });
  //===================================================================
  // 🚀 CONTROLLER STEP 2 — Test create()

  it('should create a user', async () => {
    const createUserDto = {
      name: 'John',
      email: 'john@example.com',
      password: '123456',
    };

    const createdUser = {
      id: 1,
      ...createUserDto,
    };

    mockUsersService.create.mockResolvedValue(createdUser);

    const result = await controller.create(createUserDto);

    expect(result).toEqual(createdUser);

    expect(mockUsersService.create).toHaveBeenCalledWith(createUserDto);
  });
  //===================================================================
  //🚀 CONTROLLER STEP 3 — Test login()
  //🧪 TEST — Successful Login ✅
  it('should login user successfully', async () => {
    const loginDto = {
      email: 'john@example.com',
      password: '123456',
    };

    const mockResponse = {
      message: 'Login successful',
      token: 'mock_token',
      user: {
        id: 1,
        name: 'John',
        email: 'john@example.com',
      },
    };

    mockUsersService.login = jest.fn().mockResolvedValue(mockResponse);

    const result = await controller.login(loginDto);

    expect(result).toEqual(mockResponse);

    // 🔥 VERY IMPORTANT
    expect(mockUsersService.login).toHaveBeenCalledWith(loginDto.email, loginDto.password);
  });
  //===================================================================
  //🚀 CONTROLLER STEP 4 — Test findOne(id)
  //🧪 TEST — Get User By ID ✅
  it('should return user by id', async () => {
    const mockUser = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
    };

    mockUsersService.findOne = jest.fn().mockResolvedValue(mockUser);

    const result = await controller.findOne(1); // 👈 directly pass number

    expect(result).toEqual(mockUser);

    // 🔥 VERY IMPORTANT
    expect(mockUsersService.findOne).toHaveBeenCalledWith(1);
  });
  //===================================================================
  //🚀 CONTROLLER STEP 5 — Test remove(id)
  //🧪 TEST — Delete User
  it('should delete user by id', async () => {
    const mockDeletedUser = {
      id: 1,
      name: 'John',
      email: 'john@example.com',
    };

    // ✅ add remove mock if not already
    mockUsersService.remove = jest.fn().mockResolvedValue(mockDeletedUser);

    const result = await controller.remove(1);

    expect(result).toEqual(mockDeletedUser);

    // 🔥 verify call
    expect(mockUsersService.remove).toHaveBeenCalledWith(1);
  });
  //===================================================================
  //🚀 CONTROLLER STEP 6 — Test search (findAllFilter)
  //🧪 TEST 1 — With Search Value ✅
  it('should return filtered users based on search query', async () => {
    const search = 'na';

    const mockUsers = [
      { id: 1, name: 'Narresh', email: 'narresh@example.com' },
      { id: 2, name: 'Naresh Kumar', email: 'naresh@example.com' },
    ];

    // ✅ add mock if not already
    mockUsersService.findAllFiltered = jest.fn().mockResolvedValue(mockUsers);

    const result = await controller.findAllFilter(search);

    expect(result).toEqual(mockUsers);

    // 🔥 VERY IMPORTANT
    expect(mockUsersService.findAllFiltered).toHaveBeenCalledWith(search);
  });
  //------------------------------------------------------------------
  //🧪 TEST 2 — Without Search (Optional Param)
  it('should return all users if no search query provided', async () => {
    const mockUsers = [{ id: 1, name: 'John', email: 'john@example.com' }];

    mockUsersService.findAllFiltered = jest.fn().mockResolvedValue(mockUsers);

    const result = await controller.findAllFilter(undefined);

    expect(result).toEqual(mockUsers);

    expect(mockUsersService.findAllFiltered).toHaveBeenCalledWith(undefined);
  });
  //===================================================================
  //===================================================================
  //===================================================================
  //===================================================================
  //===================================================================
  //===================================================================
  //===================================================================
});

//----------------------------------------------------------------------
//TEST-RESULT
/*
pnpm exec jest src/users/users.controller.spec.ts


E:\MURALI\NEST-JS\testproj>pnpm exec jest src/users/users.controller.spec.ts
  console.log
    DB URL: postgresql://pern_store_user:vKYBVwPxADEKfk5ibKG0fieFsSGm2IE2@dpg-d6slnslm5p6s73atcljg-a.singapore-postgres.render.com/perns_store_r9l1?sslmode=verify-full

      at Object.<anonymous> (db/drizzle.ts:5:9)

  console.log
    [ROUTE] - GET /users

      at UsersController.findAll (users/users.controller.ts:114:17)

  console.log
    [ROUTE] - @Post()

      at UsersController.create (users/users.controller.ts:67:17)

  console.log
    [ROUTE] - @Post(login)

      at UsersController.login (users/users.controller.ts:89:17)

  console.log
    Email: john@example.com

      at UsersController.login (users/users.controller.ts:90:17)

  console.log
    Password: 123456

      at UsersController.login (users/users.controller.ts:91:17)

  console.log
    [ROUTE] - GET /users/:id

      at UsersController.findOne (users/users.controller.ts:167:17)

  console.log
    [ROUTE] - @Delete()-remove(id)

      at UsersController.remove (users/users.controller.ts:176:17)

  console.log
    [ROUTE] - GET /users/search?search=

      at UsersController.findAllFilter (users/users.controller.ts:124:17)

  console.log
    [ROUTE] - GET /users/search?search=

      at UsersController.findAllFilter (users/users.controller.ts:124:17)

 PASS  src/users/users.controller.spec.ts
  UsersController - Step 1
    √ should return all users (22 ms)
    √ should create a user (9 ms)
    √ should login user successfully (15 ms)
    √ should return user by id (9 ms)
    √ should delete user by id (8 ms)
    √ should return filtered users based on search query (8 ms)
    √ should return all users if no search query provided (7 ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Snapshots:   0 total
Time:        2.329 s
Ran all test suites matching src/users/users.controller.spec.ts.

E:\MURALI\NEST-JS\testproj>
*/
/*
🏆 FINAL RESULT (Controller)
You have now tested:
| Feature      | Covered |
| ------------ | ------- |
| GET all      | ✅       |
| POST create  | ✅       |
| POST login   | ✅       |
| GET by id    | ✅       |
| DELETE       | ✅       |
| QUERY params | ✅       |

*/

//----------------------------------------------------------------------
/* import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
 */
//----------------------------------------------------------------------
