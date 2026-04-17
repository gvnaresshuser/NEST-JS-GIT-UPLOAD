import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {

    // ✅ GET /users
    // ✅ GET /users?role=ENGINEER
    // ✅ GET /users?role=ENGINEER&age=54
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

    // ✅ GET /users/interns
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
}