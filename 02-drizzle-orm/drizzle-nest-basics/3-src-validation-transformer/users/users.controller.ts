import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UserResponseDto } from './dto/user-response.dto';
/*
(Only class-transformer Examples)
pnpm install class-transformer
1. Install class-transformer: pnpm install class-transformer
2. Use class-transformer decorators in DTOs
3. Use ClassSerializerInterceptor in controller or globally
pnpm install class-transformer
add this in main.ts
app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
*/

@Controller('users')
//@UseInterceptors(ClassSerializerInterceptor) // required for Exclude/Expose
export class UsersController {

  // ✅ 1. Query Transformation
  // GET http://localhost:3000/users?limit=5&active=true
  @Get()
  getUsers(@Query() query: GetUsersDto) {
    return {
      message: 'Query transformed',
      data: query,
      types: {
        limit: typeof query.limit,   // number
        active: typeof query.active, // boolean
      },
    };
  }

  // ✅ 2. Body Transformation
  // POST http://localhost:3000/users
  @Post()
  createUser(@Body() body: CreateUserDto) {
    console.log('Received Body:', body);
    return {
      message: 'Body transformed',
      data: body,
      types: {
        age: typeof body.age,           // number
        isActive: typeof body.isActive, // boolean
      },
    };
  }
  /*
  ✅ Valid Request Body
{
  "age": 25,
  "isActive": true,
  "name": "naresh",
  "address": {
    "street": "MG Road",
    "city": "Hyderabad",
    "country": "India",
    "pincode": 500001
  }
}
UNCOMMENT OUT - Exclude - city AND pincode IN ADDRESS DTO TO TEST EXTRA FIELDS REMOVAL
  app.useGlobalPipes(
    new ValidationPipe({
      //whitelist: true,
      //forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //------------------------------
  ❌ Invalid Example (to test validation errors)
{
  "age": -5,
  "isActive": "yes",
  "name": 123,
  "address": {}
}
  */

  // ✅ 3. Response Transformation (Exclude + Expose)
  // GET http://localhost:3000/users/demo
  @Get('demo')
  getUser(): UserResponseDto {
    const user = new UserResponseDto();
    user.id = 1;
    user.name = 'naresh';
    user.email = 'test@gmail.com';
    user.age = 25;
    user.password = 'secret123';

    return user;
  }
}
/*
RESPONSE
-------------------------
name is renamed to user_name due to @Expose({ name: 'user_name' })
@Expose({ name: 'user_name' })
-------------------------
password not available in response due to @Exclude()
@Exclude()
password: string;
-------------------------
{
  "id": 1,
  "user_name": "naresh",
  "email": "test@gmail.com",
  "age": 25
}
*/