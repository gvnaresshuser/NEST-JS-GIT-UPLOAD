import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
//Create Decorator - Use in Controller
import { GetUser } from './decorators/get-user.decorator';
//import { UseGuards } from '@nestjs/common';
//import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ParseIntCustomPipe } from './pipes/parse-int-custom/parse-int-custom.pipe';

//E:\MURALI\NEST-JS\nestjs-eslint\src\users\users.controller.ts
//pnpm exec eslint .
//pnpm exec eslint src/users/users.controller.ts

// 🔥 Add these imports (already partially present)
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ErrorResponseDto } from '../common/dto/error-response.dto';

@ApiTags('Users')
@ApiBearerAuth() // applies JWT to all routes (you already added 👍)
// 🔥 Add here (GLOBAL for this controller)
@ApiResponse({
  status: 400,
  description: 'Bad Request',
  type: ErrorResponseDto,
})
@ApiResponse({
  status: 401,
  description: 'Unauthorized',
  type: ErrorResponseDto,
})
@ApiResponse({
  status: 404,
  description: 'Not Found',
  type: ErrorResponseDto,
})
@ApiResponse({
  status: 500,
  description: 'Internal Server Error',
  type: ErrorResponseDto,
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ✅ PROFILE
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get logged-in user profile' })
  @ApiResponse({ status: 200, description: 'Profile fetched successfully' })
  getProfile(@GetUser() user: any) {
    return {
      message: 'User profile fetched successfully',
      user,
    };
  }

  // ✅ ME (custom decorator field)
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get logged-in user name' })
  @ApiResponse({ status: 200, description: 'User name fetched' })
  getMyName(@GetUser('name') name: string) {
    const x: number = 10;
    console.warn(x);
    return { name };
  }

  // ✅ CREATE USER
  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiBody({ type: CreateUserDto }) // 🔥 important
  @ApiResponse({ status: 201, description: 'User created successfully' })
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  // ✅ LOGIN
  @Post('login')
  @ApiOperation({ summary: 'Login user and return JWT token' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful, returns token' })
  async login(@Body() body: LoginDto) {
    return this.usersService.login(body.email, body.password);
  }

  // ✅ GET ALL
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users fetched successfully' })
  findAll() {
    return this.usersService.findAll();
  }

  // ✅ FILTER USERS
  @Get('search')
  @ApiOperation({ summary: 'Search users by name/email' })
  @ApiQuery({ name: 'search', required: false, example: 'na' })
  @ApiResponse({ status: 200, description: 'Filtered users' })
  findAllFilter(@Query('search') search?: string) {
    return this.usersService.findAllFiltered(search);
  }

  // ✅ JWT PROTECTED
  @Get('secure')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get users (JWT protected)' })
  @ApiResponse({ status: 200, description: 'Authorized users list' })
  findAllSecure() {
    return this.usersService.findAll();
  }

  // ✅ JWT + FILTER
  @Get('secure/search')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Search users (JWT protected)' })
  @ApiQuery({ name: 'search', required: false })
  @ApiResponse({ status: 200, description: 'Filtered users (secure)' })
  findAllSecureFilter(@Query('search') search?: string) {
    return this.usersService.findAllFiltered(search);
  }

  // ✅ CUSTOM PIPE
  @Get('custom/:id')
  @ApiOperation({ summary: 'Get user using custom pipe' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'User fetched using custom pipe' })
  findOneCustom(@Param('id', ParseIntCustomPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // ✅ GET BY ID (JWT)
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by ID (JWT required)' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'User found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  // ✅ DELETE
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({ status: 200, description: 'User deleted' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
