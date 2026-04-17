import {
    Controller,
    Get,
    Post,
    Param,
    Query,
    Body,
    ParseIntPipe,
    ParseBoolPipe,
    ParseFloatPipe,
    ParseUUIDPipe,
    ParseArrayPipe,
    DefaultValuePipe,
    ParseEnumPipe,
    ParseDatePipe,
    ValidationPipe,
} from '@nestjs/common';
import { TrimAndValidatePipe } from './pipes/trim/trim.pipe';

// --------------------------------------------
// ENUM for ParseEnumPipe
// --------------------------------------------
enum Role {
    ADMIN = 'admin',
    USER = 'user',
}

// --------------------------------------------
// DTO for ValidationPipe demo
// --------------------------------------------
class CreateUserDto {
    name: string;
    email: string;
}

// --------------------------------------------
// CONTROLLER
// --------------------------------------------
@Controller('users')
export class UsersController {

    // --------------------------------------------
    // ✅ ParseIntPipe
    // --------------------------------------------
    @Get('int/:id')
    getById(
        @Param('id', ParseIntPipe) id: number
    ) {
        return { message: 'Parsed int', id };
    }

    // --------------------------------------------
    // ✅ ParseBoolPipe
    // --------------------------------------------
    @Get('bool')
    getBool(
        @Query('active', ParseBoolPipe) active: boolean
    ) {
        return { message: 'Parsed boolean', active };
    }

    // --------------------------------------------
    // ✅ ParseFloatPipe
    // --------------------------------------------
    @Get('float')
    getFloat(
        @Query('price', ParseFloatPipe) price: number
    ) {
        return { message: 'Parsed float', price };
    }

    // --------------------------------------------
    // ✅ ParseUUIDPipe
    // --------------------------------------------
    @Get('uuid/:id')
    getUUID(
        @Param('id', new ParseUUIDPipe({ version: '4' })) id: string
    ) {
        return { message: 'Valid UUID', id };
    }

    // --------------------------------------------
    // ✅ ParseArrayPipe
    // --------------------------------------------
    @Get('array')
    getArray(
        @Query(
            'ids',
            new ParseArrayPipe({ items: Number, separator: ',' })
        )
        ids: number[]
    ) {
        return { message: 'Parsed array', ids };
    }

    // --------------------------------------------
    // ✅ DefaultValuePipe
    // --------------------------------------------
    @Get('default')
    getDefault(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return { message: 'Default value applied', page };
    }

    // --------------------------------------------
    // ✅ ParseEnumPipe
    // --------------------------------------------
    @Get('enum')
    getEnum(
        @Query('role', new ParseEnumPipe(Role)) role: Role
    ) {
        return { message: 'Parsed enum', role };
    }

    // --------------------------------------------
    // ✅ ParseDatePipe
    // --------------------------------------------
    @Get('date')
    getDate(
        @Query('date', new ParseDatePipe()) date: Date
    ) {
        return { message: 'Parsed date', date };
    }

    // --------------------------------------------
    // ✅ ValidationPipe
    // --------------------------------------------
    @Post('validate')
    createUser(
        @Body(new ValidationPipe({ transform: true }))
        body: CreateUserDto
    ) {
        return { message: 'Validated DTO', body };
    }

    // --------------------------------------------
    // ✅ CUSTOM PIPE (Trim + Validate)
    // --------------------------------------------
    //https://docs.nestjs.com/pipes#custom-pipes
    //http://localhost:3000/users/custom?name=   John Doe

    @Get('custom')
    customPipeDemo(
        @Query('name', TrimAndValidatePipe) name: string
    ) {
        return { message: 'Custom pipe applied', name };
    }
}