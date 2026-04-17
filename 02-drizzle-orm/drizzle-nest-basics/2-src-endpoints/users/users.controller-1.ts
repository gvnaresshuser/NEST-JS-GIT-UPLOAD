import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { FilterUsersDto } from '../users/dto/filter-users.dto';

//users.controller-1.ts
@Controller('users')
export class UsersController {
    /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id
    */

    /*  @Get() //GET users - http://localhost:3000/users
     findAll() {
         return [];
     } */
    //keep this route before users/:id route - ORDER DOES MATTER
    /*  @Get('interns') //GET /user/interns
     findAllInterns() {
         return [];
     } */

    //MOVED STATIC ROUTE BEFORE DYNAMIC ROUTE
    @Get('filter') //GET http://localhost:3000/users/filter?role=ENGINEER
    findAllQryFilter(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        //return [];
        return [role];
    }

    @Get(':id') //GET /users/:id - DYNAMIC ROUTE  - GET http://localhost:3000/users/1
    findOne(@Param('id') id: string) {
        //return { "hello":id };
        return { id };
    }

    @Post() //POST /users - POST http://localhost:3000/users
    create(@Body() user: {}) {
        return user;
        //return {id:1,...user};
    }

    @Patch(':id') //PATCH /users/:id
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate };
    }

    @Delete(':id') //DELETE /users/:id
    delete(@Param('id') id: string) {
        return { id };
    }

    //QUERY PARAMETER
    /*  @Get() //GET /users?role=engineer
     findAllQry(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
         //return [];
         return [role];
     } */

    //STATIC ROUTE - MOVE THIS AT STARTING - STATIC ROUTE MUST BE BEFORE DYNAMIC ROUTE
    /* @Get('filter') //GET http://localhost:3000/users/filter?role=ENGINEER
    findAllQryFilter(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        //return [];
        return [role];
    } */

    //QUERY PARAMETER
    /* @Get() //GET /users?role=engineer&age=54
    findAllQryRoleAge(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
        @Query('age') age?: number) {
        return [role];
    } */
    //----------------- USING FILTER DTO -------------------
    //VALID GET http://localhost:3000/users?role=ADMIN&age=25
    //INVALID GET http://localhost:3000/users?role=NARESSH
    @Get()
    findAll(@Query() query: FilterUsersDto) {
        return query;
    }
}
/*
GET
Always keep static routes BEFORE dynamic routes

//STATIC ROUTE
@Get('filter')
findAllQry(@Query('role') role?: string) {
  return [role]
}

//DYNAMIC ROUTE
@Get(':id')
findOne(@Param('id') id: string) {
  return { id }
}
*/
/*
✅ Very Important Rule

👉 Query parameters DO NOT create a new route

These are same:

GET /users
GET /users?role=ADMIN
GET /users?role=ADMIN&age=25

All map to:

@Get()
⭐ Then why first method is executed?

Because NestJS uses route registration order

👉 The first matching route wins

So Nest internally registers like:

1️⃣ GET /users → findAll
2️⃣ GET /users → findAllQry
3️⃣ GET /users → findAllQryRoleAge

When request comes:

GET /users?role=ADMIN

Nest checks:

✔ Do we have GET /users ?
👉 YES → first one → execute → STOP searching

So remaining methods are never reached
*/