import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

//users.controller-0.ts

@Controller('users')
export class UsersController {
    /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users/:id
    DELETE /users/:id

    */

    /*   @Get() //GET users - http://localhost:3000/users
      findAll() {
          return ['naresssh123'];
      } */
    //keep this STATIC ROUTE before users/:id route - ORDER DOES MATTER
    @Get('interns') //GET http://localhost:3000/users/interns
    findAllInterns() {
        return ['interns'];
        //return [{"name":"GV Naressh"}];
    }
    @Get('admin') //GET http://localhost:3000/users/admin
    findAllInternsAdmin() {
        return ['Admin'];
        //return [{"name":"GV Naressh"}];
    }



    @Get(':id') //GET /users/:id - DYNAMIC ROUTE -  http://localhost:3000/users/1
    findOne(@Param('id') id: string) {
        return { id: id };
    }

    //STATIC ROUTE - ORDER DOES MATTER - keep this before users/:id route
    /*  @Get('internsnew') //GET http://localhost:3000/users/internsnew
     findAllInternsnew() {
         return ['internsnew'];
         //return [{"name":"GV Naressh"}];
     } */

    @Post() //POST http://localhost:3000/users
    create(@Body() user: {}) {
        return user;
    }
    /*
    body
     {
        "name": "Naresh",
        "email": "naresh@gmail.com",
        "role": "INTERN",
        "age": 25
    }
    */

    @Patch(':id') //PATCH /users/:id -  http://localhost:3000/users/1
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate };
    }
    /*
   body
    {
       "name": "Naresh",
       "email": "test@gmail.com",
       "role": "INTERN",
       "age": 25
   }
       return
         {
       "id": "1",
       "name": "Naresh",
       "email": "test@gmail.com",
       "role": "INTERN",
       "age": 25
   }
   */

    @Delete(':id') //DELETE /users/:id -  http://localhost:3000/users/1
    delete(@Param('id') id: string) {
        return { id, message: 'User deleted' };
    }

    //QUERY PARAMETER
    /*  @Get() //GET /users?role=engineer -  http://localhost:3000/users?role=engineer
     findAllQry(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
         return ['findAllQry'];
     } */

    //QUERY PARAMETER
    /*  @Get() //GET /users?role=engineer&age=54 - http://localhost:3000/users?role=engineer&age=54
     findAllQryRoleAge(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
         @Query('age') age?: number) {
         return [{age, role}];
     } */
    //------------------------------------------------
    @Get()
    findAllSolution(
        @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
        @Query('age') age?: number
    ) {
        return {
            message: 'Users fetched',
            filters: { role, age }
        };
    }
}
