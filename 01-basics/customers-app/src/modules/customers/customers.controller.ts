import {
    Controller,
    Get,
    Post,
    Body,
    Query,
    Delete,
    Param,
    Patch,
} from '@nestjs/common';


//-----------------------------------------------------------------
// ✅ Import DTOs
/* 
import { ParamsDto } from './dto/params.dto';
import { SearchCustomersDto } from './dto/search-customers.dto';
 */
//OR IMPORT LIKE THIS CREATING index.ts file inside dto folder - MORE PROFESSIONAL WAY
import { ParamsDto, SearchCustomersDto } from './dto';
//-----------------------------------------------------------------
@Controller('customers')
export class CustomersController {

    // ✅ 1. Query Params
    @Get()
    findAll(
        @Query('type') type?: string,
        @Query('age') age?: number
    ) {
        return {
            endpoint: 'GET /customers',
            queryReceived: {
                type: type ?? null,
                age: age ?? null
            }
        };
    }

    // ✅ 2. Static Route
    @Get('vip')
    getVipCustomers() {
        return [
            { id: 1, name: 'VIP A' },
            { id: 2, name: 'VIP B' }
        ];
    }

    // ✅ 3. Dynamic Route
    @Get(':id')
    findOne(@Param('id') id: string) {
        return {
            endpoint: 'GET /customers/:id',
            id
        };
    }

    // ✅ 4. Nested Route
    @Get(':customerId/orders/:orderId')
    getOrder(
        @Param('customerId') customerId: string,
        @Param('orderId') orderId: string
    ) {
        return {
            customerId,
            orderId
        };
    }

    // ✅ 5. POST
    @Post()
    create(@Body() body: any) {
        return {
            message: 'Customer created',
            body
        };
    }

    // ✅ 6. PATCH
    @Patch(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return {
            message: 'Customer updated',
            id,
            body
        };
    }

    // ✅ 7. DELETE
    @Delete(':id')
    delete(@Param('id') id: string) {
        return {
            message: 'Customer deleted',
            id
        };
    }

    // ✅ 8. Collect ALL Query Params
    @Get('search')
    search(@Query() query: SearchCustomersDto) {
        return {
            message: 'All query params',
            query
        };
    }

    // ✅ 9. Collect ALL Params (DTO)
    @Get(':customerId/orders/:orderId/items/:itemId')
    getAllParams(@Param() params: ParamsDto) {
        return {
            message: 'All params DTO',
            params
        };
    }

    // ✅ 10. Combine Params + Query
    @Get(':customerId/orders/:orderId/items/:itemId/full')
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
//------------------------------------------------------
/* import { Controller } from '@nestjs/common';

@Controller('customers')
export class CustomersController {}
 */