import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common';
import { FilterUsersDto } from './dto/filter-users.dto';
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

   /*  @Get() //GET users - http://localhost:3000/users
    findAll() {
        return [];
    } */
    //keep this STATIC ROUTE before users/:id route - ORDER DOES MATTER
 /*    @Get('interns') //GET http://localhost:3000/users/interns
    findAllInterns() {
        return ['Intern A', 'Intern B'];
        //return [{"name":"GV Naressh"}];
    }
    @Get('admin') //GET http://localhost:3000/users/admin
    findAllInternsAdmin() {
        return ['Admin A', 'Admin B'];
        //return [{"name":"GV Naressh"}];
    }

    @Get('interns') //GET http://localhost:3000/users/interns
    findAllInterns1() {
        //return ['Intern A', 'Intern B'];
        return [{ "name": "GVN" }];
    }  */
    @Get('admin') //GET http://localhost:3000/users/admin
    findAllInternsAdmin() {
        return ['Admin A', 'Admin B'];
        //return [{"name":"GV Naressh"}];
    }
    @Get(':id') //GET /users/:id - DYNAMIC ROUTE -  http://localhost:3000/users/1
    findOne(@Param('id') id: string) {
        return { id };
    }

    @Get(':id') //GET /users/:id - DYNAMIC ROUTE -  http://localhost:3000/users/1
    findOne1(@Param('id') id: string) {
        return { result:id+100 };
    }

    //ParseIntPipe - to convert string to number
 /*    @Get(':id')
    findOne1(@Param('id', ParseIntPipe) id: number) {
        return { id };
    } */
    /*  @Get(':id')
     findOne1(@Param('id', ParseIntPipe) id: number) {
         return { result:id+10 };
     } */

   /*  @Get(':id/orders/:orderId') //GET /users/:id/orders/:orderId - DYNAMIC ROUTE -  http://localhost:3000/users/1/orders/100
    findOne2(@Param('id') id: string, @Param('orderId') orderId: string) {
        return { id, orderId };
    } */


 /*    @Post() //POST /users
    create(@Body() user: {}) {
        return user;
    } */
    /*
    POST http://localhost:3000/users
    body
    {
    "name": "John Doe",
    "email": "john@test.com",
    "password": "pass123",
    "role": "ENGINEER",
    "age": 25
    }
    */

/*     @Patch(':id') //PATCH /users/:id -  http://localhost:3000/users/1
    update(@Param('id') id: string, @Body() userUpdate: {}) {
        return { id, ...userUpdate };
    } */
    /*
    PATCH http://localhost:3000/users/1
    body
    {
    "name": "John Doe Updated",
    "email": "john.updated@test.com"
    }
    */

  /*   @Delete(':id') //DELETE /users/:id -  http://localhost:3000/users/1
    delete(@Param('id') id: string) {
        return { message: 'User deleted successfully', id };
    } */
    /*
    DELETE http://localhost:3000/users/1    
    */

    //QUERY PARAMETER
    /*   @Get() //GET /users?role=engineer -  http://localhost:3000/users?role=engineer
      findAllQry(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
          return [role];
      } */

    //QUERY PARAMETER
    /*   @Get() //GET /users?role=engineer&age=54 - http://localhost:3000/users?role=engineer&age=54
      findAllQryRoleAge(
          @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
          @Query('age') age?: number) {
          return [];
      } */
    //-------------------------
    //VERY IMPORTANT - DTO CLASS FOR VALIDATION AND TRANSFORMATION
    @Get() //GET /users?role=engineer&age=54 - http://localhost:3000/users?role=engineer&age=54
    findAllQryRoleAgeFilter(@Query() query: FilterUsersDto) {
        return [query];
    }
    //DON'T FORGET TO ADD VALIDATION PIPE IN MAIN.TS - app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }));
    //------------------------------------------------
    /*    @Get()
       findAllSolutionWithoutFilter(
           @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
           @Query('age') age?: number
       ) {
           return {
               message: 'Users fetched',
               filters: { role, age }
           };
       } */
}
