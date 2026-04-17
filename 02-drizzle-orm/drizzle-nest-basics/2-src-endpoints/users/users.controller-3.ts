import {
    Body, Controller, Delete, Get, Param, Patch,
    Post, Query
} from '@nestjs/common';

//COMPLETE CONTROLLER (ALL TYPES)-TESTING
/*
🚀 Quick All-in-One Test List

Copy & test one by one:

GET http://localhost:3000/users
GET http://localhost:3000/users?role=ENGINEER
GET http://localhost:3000/users?role=ADMIN&age=30
GET http://localhost:3000/users/interns
GET http://localhost:3000/users/1
GET http://localhost:3000/users/10/orders/500

POST http://localhost:3000/users
PATCH http://localhost:3000/users/1
DELETE http://localhost:3000/users/1
*/

@Controller('users')
export class UsersController {

    // ✅ ROOT + QUERY
    @Get()
    getUsers(@Query('role') role: string, @Query('age') age: number) {
        return { type: 'QUERY', role, age };
    }

    // ✅ STATIC
    @Get('interns')
    getInterns() {
        return { type: 'STATIC ROUTE' };
    }

    // ✅ MULTIPLE PARAMS
    @Get(':userId/orders/:orderId')
    getOrder(
        @Param('userId') userId: string,
        @Param('orderId') orderId: string
    ) {
        return { type: 'MULTI PARAM', userId, orderId };
    }

    // ✅ SINGLE PARAM
    @Get(':id')
    getUser(@Param('id') id: string) {
        return { type: 'DYNAMIC PARAM', id };
    }

    // ✅ POST BODY
    @Post()
    create(@Body() body: any) {
        return { type: 'POST', body };
    }

    // ✅ PATCH
    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return { type: 'PATCH', id, body };
    }

    // ✅ DELETE
    @Delete(':id')
    remove(@Param('id') id: string) {
        return { type: 'DELETE', id };
    }
}
/*
🚀 ✅ RECOMMENDED TEST ORDER
1. GET http://localhost:3000/users
2. GET http://localhost:3000/users?role=ENGINEER
3. GET http://localhost:3000/users?role=ADMIN&age=30
4. GET http://localhost:3000/users/interns
5. GET http://localhost:3000/users/10/orders/500
6. GET http://localhost:3000/users/1
7. POST http://localhost:3000/users
8. PATCH http://localhost:3000/users/1
9. DELETE http://localhost:3000/users/1

ONLY FOR POST AND PATCH WE SUPPLY BODY

🧪 1. GET → ROOT
✅ Request
GET http://localhost:3000/users
❌ Body

None

✅ Response
{
  "type": "QUERY",
  "role": null,
  "age": null
}
🧪 2. GET → QUERY (ROLE)
✅ Request
GET http://localhost:3000/users?role=ENGINEER
✅ Response
{
  "type": "QUERY",
  "role": "ENGINEER",
  "age": null
}
🧪 3. GET → QUERY (ROLE + AGE)
✅ Request
GET http://localhost:3000/users?role=ADMIN&age=30
✅ Response
{
  "type": "QUERY",
  "role": "ADMIN",
  "age": "30"
}

⚠️ Age is string (important concept)

🧪 4. GET → STATIC ROUTE
✅ Request
GET http://localhost:3000/users/interns
✅ Response
{
  "type": "STATIC ROUTE"
}
🧪 5. GET → MULTIPLE PARAMS
✅ Request
GET http://localhost:3000/users/10/orders/500
✅ Response
{
  "type": "MULTI PARAM",
  "userId": "10",
  "orderId": "500"
}
🧪 6. GET → SINGLE PARAM
✅ Request
GET http://localhost:3000/users/1
✅ Response
{
  "type": "DYNAMIC PARAM",
  "id": "1"
}
🧪 7. POST → CREATE USER
✅ Request
POST http://localhost:3000/users
✅ Body (JSON)
{
  "name": "Naresh",
  "email": "naresh@gmail.com",
  "role": "ENGINEER",
  "age": 25
}
✅ Response
{
  "type": "POST",
  "body": {
    "name": "Naresh",
    "email": "naresh@gmail.com",
    "role": "ENGINEER",
    "age": 25
  }
}
🧪 8. PATCH → UPDATE USER
✅ Request
PATCH http://localhost:3000/users/1
✅ Body (JSON)
{
  "role": "ADMIN"
}

👉 You can also try:

{
  "name": "Updated Name",
  "age": 30
}
✅ Response
{
  "type": "PATCH",
  "id": "1",
  "body": {
    "role": "ADMIN"
  }
}
🧪 9. DELETE → DELETE USER
✅ Request
DELETE http://localhost:3000/users/1
❌ Body

None

✅ Response
{
  "type": "DELETE",
  "id": "1"
}
🔥 IMPORTANT CONCEPT CHECKS
✅ 1. Route Priority
GET /users/interns

✔ Should return:

{ "type": "STATIC ROUTE" }
✅ 2. Multi Param Priority
GET /users/10/orders/500

✔ Should NOT go to :id

✅ 3. Query vs Param
GET /users/1?role=ADMIN

✔ Still hits:

@Get(':id')
*/
/*
| Type        | Example              | Body |
| ----------- | -------------------- | ---- |
| Root        | `/users`             | ❌    |
| Query       | `/users?role=ADMIN`  | ❌    |
| Static      | `/users/interns`     | ❌    |
| Dynamic     | `/users/1`           | ❌    |
| Multi Param | `/users/1/orders/10` | ❌    |
| POST        | `/users`             | ✅    |
| PATCH       | `/users/1`           | ✅    |
| DELETE      | `/users/1`           | ❌    |

*/