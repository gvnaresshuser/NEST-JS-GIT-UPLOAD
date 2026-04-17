import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Query, UsePipes } from '@nestjs/common';
import { FilterPipe } from './pipes/filter.pipe';
import { signToken } from '../common/utils/jwt.util';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
//Create Decorator - Use in Controller
import { GetUser } from './decorators/get-user.decorator';
//import { UseGuards } from '@nestjs/common';
//import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto } from './dto/login.dto';
import { ParseIntCustomPipe } from './pipes/parse-int-custom/parse-int-custom.pipe';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    //Step 7: Custom Decorator (@GetUser())
    //http://localhost:3000/users/profile
    @Get('profile')
    @UseGuards(JwtAuthGuard)
    getProfile(@GetUser() user: any) {
        console.log("[ROUTE] - @Get('profile')");
        return {
            message: 'User profile fetched successfully',
            user,
        };
    }
    //-----------------------------
    //Advanced Version (Field Extraction)
    //http://localhost:3000/users/me
    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMyName(@GetUser('name') name: string) {
        console.log("[ROUTE] - @Get('me')");
        return { name };
    }
    //-----------------------------

    // CREATE
    /*   @Post()
      create(@Body() body: { name: string; email: string; }) {
          return this.usersService.create(body);
      } */
    /*
    {
       "name":"GV Naressh",
       "email":"gvnaressh@gmail.com",
       "password":"123456"
   }
    */
    //-------------------------------------------
    //2. Update Controller to Use DTO
    ////http://localhost:3000/users
    @Post()
    create(@Body() body: CreateUserDto) {
        console.log("[ROUTE] - @Post()");
        return this.usersService.create(body);
    }
    //-------------------------------------------
    /*
    {
     "name":"GV Naressh",
     "email":"gvnaressh@gmail.com",
     "password":"123456"
    }
    */

    //------------------------------------------
    /*
     {
     "email":"gvnaressh@gmail.com",
     "password":"123456"
    }
    */
    //http://localhost:3000/users/login
    @Post('login')
    async login(@Body() body: LoginDto) {
        console.log('[ROUTE] - @Post(login)');
        console.log('Email:', body.email);
        console.log('Password:', body.password);

        return this.usersService.login(body.email, body.password);
    }
    //📄 3. Create Login Endpoint (Demo)
   /*  @Post('login')
    login() {
        console.log("[ROUTE] - SIMULATE - @Post('login')");
        // dummy user (for demo)
        const user = { "email": "gvnaressh@gmail.com", "password": "123456" };
        const token = signToken(user);
        console.log('Generated JWT:', token);
        return {
            message: 'Login successful-SIMULATE',
            token,
        };
    } */
    //------------------------------------------

    // ✅ 1. GET ALL (Basic)
    //http://localhost:3000/users
    @Get()
    findAll() {
        console.log("[ROUTE] - GET /users");
        return this.usersService.findAll();
    }

    //-----------------------------------------------

    // ✅ 2. FILTER (Query Param)
    //http://localhost:3000/users/search?search=na
    @Get('search')
    findAllFilter(@Query('search') search?: string) {
        console.log("[ROUTE] - GET /users/search?search=");
        return this.usersService.findAllFiltered(search);
    }

    //-----------------------------------------------

    // ✅ 3. JWT PROTECTED ROUTE
    //http://localhost:3000/users/secure
    @Get('secure')
    @UseGuards(JwtAuthGuard)
    findAllSecure() {
        console.log("[ROUTE] - GET /users/secure (JWT)");
        return this.usersService.findAll();
    }

    //-----------------------------------------------

    // ✅ 4. JWT + FILTER COMBINED
    //http://localhost:3000/users/secure/search?search=na
    @Get('secure/search')
    @UseGuards(JwtAuthGuard)
    findAllSecureFilter(@Query('search') search?: string) {
        console.log("[ROUTE] - GET /users/secure/search");
        return this.usersService.findAllFiltered(search);
    }

    //-----------------------------------------------
    //🔹 5. Custom Pipe Route(Separate);
    //http://localhost:3000/users/custom/1
    @Get('custom/:id')
    findOneCustom(
        @Param('id', ParseIntCustomPipe) id: number
    ) {
        console.log('[ROUTE] - Custom ParseIntCustomPipe');
        return this.usersService.findOne(id);
    }


    // ✅ 6. GET BY ID (ParseIntPipe + JWT)
    //http://localhost:3000/users/1
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id', ParseIntPipe) id: number) {
        console.log("[ROUTE] - GET /users/:id");
        return this.usersService.findOne(id);
    }


    // DELETE
    //http://localhost:3000/users/1
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        console.log("[ROUTE] - @Delete()-remove(id)");
        return this.usersService.remove(id);
    }
}
/*
🔄 Full Flow (Your App)
Request →
  Guard →
    Pipe →
      Controller →
        Service →
          (Exception thrown?) → Filter ✅
          (Success?) → Interceptor ✅
*/