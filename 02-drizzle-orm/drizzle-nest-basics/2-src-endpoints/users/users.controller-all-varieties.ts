import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
class ParamsDto {
    userId: string;
    orderId: string;
    itemId: string;
}
class SearchUsersDto {
    role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
    age?: number;
    city?: string;
}
//users.controller-all-varieties.ts

@Controller('users1')
export class UsersController {

    /*
      🚀 ✅ RECOMMENDED TEST ORDER
    1. GET http://localhost:3000/users
    2. GET http://localhost:3000/users?role=ENGINEER
    3. GET http://localhost:3000/users?role=ADMIN&age=30
    4. GET http://localhost:3000/users/interns
    5. GET http://localhost:3000/users/10/orders/500
    6. GET http://localhost:3000/users/1
    7. POST http://localhost:3000/users
    {
        "name": "Naresh",
        "email": "naresh@gmail.com",
        "role": "ENGINEER",
        "age": 25
    }
    8. PATCH http://localhost:3000/users/1
    {
        "name": "Naresh",
        "email": "naresh@gmail.com",
        "role": "INTERN",
        "age": 25
    }
    9. DELETE http://localhost:3000/users/1
      */
    //TESTING - URLS
    /*
   🔷 ONLY ROLE
   GET http://localhost:3000/users?role=INTERN
   GET http://localhost:3000/users?role=ENGINEER
   GET http://localhost:3000/users?role=ADMIN
   🔷 ONLY AGE
   GET http://localhost:3000/users?age=20
   GET http://localhost:3000/users?age=25
   GET http://localhost:3000/users?age=30
   🔷 ROLE + AGE (ALL COMBINATIONS)
   GET http://localhost:3000/users?role=INTERN&age=20
   GET http://localhost:3000/users?role=INTERN&age=25
   GET http://localhost:3000/users?role=INTERN&age=30

   GET http://localhost:3000/users?role=ENGINEER&age=20
   GET http://localhost:3000/users?role=ENGINEER&age=25
   GET http://localhost:3000/users?role=ENGINEER&age=30

   GET http://localhost:3000/users?role=ADMIN&age=20
   GET http://localhost:3000/users?role=ADMIN&age=25
   GET http://localhost:3000/users?role=ADMIN&age=30
   🔷 ORDER DOES NOT MATTER (IMPORTANT)
   GET http://localhost:3000/users?role=ADMIN&age=30
   GET http://localhost:3000/users?age=30&role=ADMIN

   ✔ Both are SAME
   🔷 PARTIAL QUERY
   GET http://localhost:3000/users?role=
   GET http://localhost:3000/users?age=
   🔷 EXTRA QUERY (IGNORED BUT ACCEPTED)
   GET http://localhost:3000/users?role=ADMIN&age=30&city=Hyderabad
   GET http://localhost:3000/users?role=ENGINEER&extra=test
   🔷 INVALID VALUES (NO VALIDATION YET)
   GET http://localhost:3000/users?role=CEO
   GET http://localhost:3000/users?role=ADMIN&age=abc
   🔥 FINAL SUMMARY
   /users                      → no query
   /users?role=ADMIN           → single query
   /users?age=30               → single query
   /users?role=ADMIN&age=30    → multiple query
   /users?age=30&role=ADMIN    → order doesn’t matter
    */
    @Get()
    findAll(
        @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
        @Query('age') age?: number
    ) {
        return {
            endpoint: 'GET /users',
            message: 'Fetched all users',
            queryReceived: {
                role: role ?? null,
                age: age ?? null
            }
        };
    }
    /*
    role ?? null
    This is called the Nullish Coalescing Operator.
    🔷 Meaning
    If role is null or undefined → use null  
    Otherwise → use role
    */

    /*
    ✅ STATIC ROUTE (or FIXED ROUTE)
    🔷 WHY “STATIC ROUTE”?
        Because:
        The path is fixed → "interns"
        No variables → no :id
        Exact match required
        ✅ VALID (ONLY ONE)
        ✅ 1. EXACT MATCH ONLY
        GET http://localhost:3000/users/interns
        ✅ 2. HIGHER PRIORITY THAN DYNAMIC ROUTES
        @Get('interns')   ✅ first
        @Get(':id')       ✅ later
        👉 /users/interns → goes to STATIC

        ❌ WRONG ORDER
        @Get(':id')
        @Get('interns')
        👉 /users/interns → treated as:
        { "id": "interns" }

    */
    // ✅ GET http://localhost:3000/users/interns
    @Get('interns')
    findAllInterns() {
        return {
            endpoint: 'GET /users/interns',
            message: 'Fetched all interns',
            data: [
                { id: 1, name: 'Intern A' },
                { id: 2, name: 'Intern B' }
            ]
        };
    }

    // ✅ GET /users/:id
    @Get(':id')
    findOne(@Param('id') id: string) {
        return {
            endpoint: 'GET /users/:id',
            message: 'Fetched single user',
            receivedId: id
        };
    }

    @Get(':userId/orders/:orderId')
    getOrder(
        @Param('userId') userId: string,
        @Param('orderId') orderId: string
    ) {
        return {
            endpoint: 'GET /users/:userId/orders/:orderId',
            userId,
            orderId
        };
    }

    // ✅ POST /users
    @Post()
    create(@Body() user: any) {
        return {
            endpoint: 'POST /users',
            message: 'User created successfully',
            receivedBody: user
        };
    }

    // ✅ PATCH /users/:id
    @Patch(':id')
    update(@Param('id') id: string, @Body() userUpdate: any) {
        return {
            endpoint: 'PATCH /users/:id',
            message: 'User updated successfully',
            updatedUser: {
                id,
                ...userUpdate
            }
        };
    }

    // ✅ DELETE /users/:id
    @Delete(':id')
    delete(@Param('id') id: string) {
        return {
            endpoint: 'DELETE /users/:id',
            message: 'User deleted successfully',
            deletedId: id
        };
    }
    //------------------------- ADVANCED USECASES ------------------------------

    /*
    Method 1: Individual (what you already did)
    @Query('role') role?: string,
    @Query('age') age?: number

    ✔ Works, but not scalable
    */
    //✅ 🔥 Method 2:COLLECT ALL QUERY PARAMS(like @Param())
    //GET http://localhost:3000/users/search?role=ADMIN&age=30&city=Hyderabad
    @Get('search')
    searchUsers(@Query() query: any) {
        return {
            message: 'Collected all query params',
            query
        };
    }
    //INSTEAD OF USING any AS TYPE USE SearchUsersDto DTO CLASS - RECOMMENDED
    //GET http://localhost:3000/users/search?role=ADMIN&age=30&city=Hyderabad
    /* @Get('search')
    searchUsers(@Query() query: SearchUsersDto) {
        return {
            message: 'Collected all query params (DTO)',
            query
        };
    } */

    //✅ SINGLE ROUTE → COLLECT MULTIPLE PARAMS(USING ONE @Param());
    //GET http://localhost:3000/users/10/orders/500/items/999
    /*  @Get(':userId/orders/:orderId/items/:itemId')
     getAllParams(@Param() params: any) {
         return {
             endpoint: 'GET /users/:userId/orders/:orderId/items/:itemId',
             message: 'Collected all params using single @Param() WITH any',
             params
         };
     } */
    /*
    Instead of writing:
    @Param('userId') userId: string,
    @Param('orderId') orderId: string,
    @Param('itemId') itemId: string

    👉 You used:

    @Param() params

    ✔ NestJS automatically collects all path params into one object
    */
    //-------------------------------------------------------
    //Instead of any, you can type it:CREATE A CLASS ParamsDto...instead of using any as type
    //DECLARE CLASS ALWAYS ON TOP BEFORE USING IT..SO THAT NEST JS WILL INSTANTIATE IT
    //GET http://localhost:3000/users/10/orders/500/items/999
    @Get(':userId/orders/:orderId/items/:itemId')
    getAllParamsDto(@Param() params: ParamsDto) {
        return {
            endpoint: 'GET /users/:userId/orders/:orderId/items/:itemId',
            message: 'Collected all params using single @Param() WITH ParamsDto',
            params
        };
    }
    /*
    🧠 FINAL UNDERSTANDING
    @Param('id') → single value  
    @Param()     → all params as object
    */
    //------------------------------------------------------
    //You can combine params + query:
    //GET http://localhost:3000/users/10/orders/500/items/999?status=active
    @Get(':userId/orders/:orderId/items/:itemId')
    getFull(
        @Param() params: any,
        @Query() query: any
    ) {
        return {
            params,
            query
        };
    }
}
