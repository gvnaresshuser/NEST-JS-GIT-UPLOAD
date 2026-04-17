import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseArrayPipe,
  ParseBoolPipe,
  ParseEnumPipe,
  ParseFloatPipe,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//https://github.com/typestack/class-validator
//https://github.com/typestack/class-transformer
enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  SUPER_ADMIN = 'SUPER_ADMIN',
}

/*
CLASS VALIDATION with ValidationPipe and class-validator decorators
1. Install class-validator: pnpm install class-validator
2. Create DTO with class-validator decorators
3. Use ValidationPipe in controller method or globally in main.ts
pnpm install class-validator
add this in main.ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
*/
/*
🧪 Test URLs (Quick Reference)
GET  http://localhost:3000/users/10
GET  http://localhost:3000/users/price?value=12.5
GET  http://localhost:3000/users/active?active=true
GET  http://localhost:3000/users?limit=5
GET  http://localhost:3000/users/ids?ids=1,2,3
GET  http://localhost:3000/users/uuid/550e8400-e29b-41d4-a716-446655440000
GET  http://localhost:3000/users/role?role=ADMIN

POST /users
{
  "name": "naresh",
  "age": "25",
  "isActive": "true",
  "address": {
    "city": "Hyderabad",
    "country": "India"
  }
}
*/

@Controller('users')
export class UsersController {

  //STATIC ROUTES FIRST

  // ✅ 1. ParseFloatPipe
  // GET http://localhost:3000/users/price?value=10.5
  // GET http://localhost:3000/users/price?value=10
  // GET http://localhost:3000/users/price?value=abc - ERROR because abc is not a float
  // GET http://localhost:3000/users/price?value="" - numeric string is expected
  @Get('price')
  getPrice(
    @Query('value', ParseFloatPipe) value: number
  ) {
    console.log('Parsed float value:', value, 'Type:', typeof value);
    return {
      message: 'Float value parsed',
      value,
    };
  }

  // ✅ 2. ParseBoolPipe
  // GET http://localhost:3000/users/active?active=true
  @Get('active')
  getActiveUsers(
    @Query('active', new ParseBoolPipe({
      exceptionFactory: () => {
        throw new BadRequestException('Validation failed (boolean string is expected)');
      }
    })) active: boolean
  ) {
    console.log('Query parameters:', active);
    console.log('Parsed boolean value:', active, 'Type:', typeof active);
    console.log('RAW VALUE:', active);
    return {
      message: 'Boolean parsed',
      active,
    };
  }


  // ✅ 3. ParseArrayPipe
  // GET http://localhost:3000/users/ids?ids=1,2,3
  // GET http://localhost:3000/users/ids?ids=1,abc,3 - ERROR because abc is not a number
  // GET http://localhost:3000/users/ids - ERROR because ids is required
  @Get('ids')
  getUsersByIds(
    @Query(
      'ids',
      new ParseArrayPipe({
        items: Number,
        separator: ',',
      }),
    )
    ids: number[],
  ) {
    console.log('Parsed IDs:', ids, 'Type:', typeof ids);
    return {
      message: 'Array parsed',
      ids,
    };
  }
  // ✅ 4. DefaultValuePipe + ParseIntPipe
  // GET http://localhost:3000/users?limit=5
  // GET http://localhost:3000/users          -> default value 100
  // GET http://localhost:3000/users?limit=abc -> default value 100
  // GET http://localhost:3000/users?limit=5.5 -> limit must be a valid integer
  // GET http://localhost:3000/users?limit="" -> default value 100
  // GET http://localhost:3000/users?limit= -> "limit": 0
  @Get()
  getUsers(
    @Query(
      'limit',
      new DefaultValuePipe(100),
      new ParseIntPipe({
        exceptionFactory: () => {
          throw new BadRequestException('limit must be a valid integer');
        },
      }),
    )
    limit: number,
  ) {
    console.log('Parsed limit:', limit, 'Type:', typeof limit);

    return {
      message: 'Users list',
      limit,
    };
  }
  // ✅ 5. ParseEnumPipe
  // GET http://localhost:3000/users/role?role=ADMIN
  // GET http://localhost:3000/users/role?role=MANAGER - ERROR because MANAGER is not a valid role
  // GET http://localhost:3000/users/role?role= - ERROR because enum string is expected
  // GET http://localhost:3000/users/role?role=ADMIN,USER - ERROR enum string is expected
  @Get('role')
  getUsersByRole(
    @Query('role', new ParseEnumPipe(Role)) role: Role
  ) {
    return {
      message: 'Enum validated',
      role,
    };
  }

  //Mixed (Static + Dynamic) ROUTES SECOND
  /*
  👉 ParseUUIDPipe:
✔ Validates full UUID format
✔ Checks structure: 8-4-4-4-12
✔ Rejects invalid characters
✔ Rejects partial UUIDs
  */

  // ✅ 6. ParseUUIDPipe - Mixed (Static + Dynamic)
  // GET http://localhost:3000/users/uuid/550e8400-e29b-41d4-a716-446655440000
  // GET http://localhost:3000/users/uuid/12345 - ERROR because 12345 is not a valid UUID
  // GET http://localhost:3000/users/uuid/ - ERROR because UUID is required
  // GET http://localhost:3000/users/uuid/zzze8400-e29b-41d4-a716-446655440000 - ERROR because zzze8400-e29b-41d4-a716-446655440000 is not a valid UUID
  // GET http://localhost:3000/users/uuid/ - numeric string is expected
  @Get('uuid/:id')
  getUserByUUID(
    @Param('id', new ParseUUIDPipe()) id: string
  ) {
    return {
      message: 'Valid UUID',
      id,
    };
  }

  //DYNAMIC ROUTES LAST

  // ✅ 7. ParseIntPipe
  // GET http://localhost:3000/users/10
  // GET http://localhost:3000/users/10.1 - ERROR because 10.1 is not an integer
  // GET http://localhost:3000/users/abc - ERROR because abc is not a number
  @Get(':id')
  getUserById(
    @Param('id', ParseIntPipe) id: number
  ) {
    console.log('Parsed ID:', id, 'Type:', typeof id);
    return {
      message: 'User fetched',
      id,
      type: typeof id,
    };
  }
  /*
  ParseFloatPipe → allows 10 and 10.5
  ParseIntPipe → ❌ rejects 10.5 because it's not a valid integer
  ---------------------------------------------------------------
  ✅ Valid integer
GET /users/10
parseInt("10") → 10 ✅

✔ Works

❌ Floating value
GET /users/10.5
parseInt("10.5") → 10

BUT ❗ NestJS checks:

👉 "10.5" is not a pure integer string

➡️ So it throws error

{
  "statusCode": 400,
  "message": "Validation failed (numeric string is expected)",
  "error": "Bad Request"
}
  ---------------------------------------------------------------
  */

  // ✅ 8. ValidationPipe (DTO)
  // POST http://localhost:3000/users
  /*
  {
    "name": "naresh",
    "age": "25",
    "isActive": "true",
    "address": {
      "city": "Hyderabad",
      "country": "India"
    }
  }
  */
  //VERY IMPORTANT
  @Post()
  // @UsePipes(new ValidationPipe({ whitelist: true }))//-or use globally in main.ts
  createUser(
    //@Body(new ValidationPipe({ whitelist: true })) body: CreateUserDto
    @Body() body: CreateUserDto
  ) {
    console.log('Received body:', body);
    return {
      message: 'User created successfully',
      data: body,
    };
  }
}
/*

---

# ✅ Correct Route Order (Priority)

👉 Always follow this order in **NestJS**:

### 1️⃣ Static Routes (Most Specific)

```ts
@Get('price')
@Get('active')
@Get('role')
```

---

### 2️⃣ Mixed Routes (Static + Dynamic)

```ts
@Get('uuid/:id')
@Get('user/:name')
```

---

### 3️⃣ Fully Dynamic Routes (Least Specific)

```ts
@Get(':id')
@Get(':anything')
```

---

# 🧠 Why This Order?

👉 NestJS matches routes **top → down**

* Static → exact match ✅
* Mixed → partially specific ✅
* Dynamic → catches everything ⚠️

---

# 🔥 Example

```ts
@Get('role')        // 1️⃣ static
@Get('uuid/:id')   // 2️⃣ mixed
@Get(':id')        // 3️⃣ dynamic
```

---

### 🧪 Request Flow

| URL               | Matches    |
| ----------------- | ---------- |
| `/users/role`     | static ✅   |
| `/users/uuid/123` | mixed ✅    |
| `/users/123`      | dynamic ✅  |
| `/users/anything` | dynamic ⚠️ |

---

# ⚡ Interview One-Liner

👉
**“Route priority in NestJS is Static → Mixed → Dynamic to avoid unintended matches.”**

---

# 🚀 Pro Tip

👉 Always keep this at bottom:

```ts
@Get(':id') // LAST ALWAYS
```



*/