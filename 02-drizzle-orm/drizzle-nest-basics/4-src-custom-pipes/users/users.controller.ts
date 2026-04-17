import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';
import { TrimAndValidatePipe } from './pipes/trim/trim.pipe';
import { LengthValidationPipe } from './pipes/length-validation.pipe';
import { AllowedValuesPipe } from './pipes/allowed-values.pipe';
import { ParseIntRangePipe } from './pipes/parse-int-range.pipe';
import { NormalizeStringPipe } from './pipes/normalize-string.pipe';
import { RequiredFieldsPipe } from './pipes/required-fields.pipe';


// --------------------------------------------
// CONTROLLER
// --------------------------------------------
@Controller('users')
export class UsersController {

    // --------------------------------------------
    // ✅ CUSTOM PIPE (Trim + Validate)
    // --------------------------------------------
    //https://docs.nestjs.com/pipes#custom-pipes
    
    //http://localhost:3000/users/custom?name=   John Doe
    //http://localhost:3000/users/custom  -- Value is required
    //http://localhost:3000/users/custom?name=   -- Value cannot be empty

    @Get('custom')
    customPipeDemo(
        @Query('name', TrimAndValidatePipe) name: string
    ) {
        return { message: 'Custom pipe applied', name };
    }
    //---------------------------------------------
    //✅ 1. Length Validation Pipe (Dynamic Config)
    @Get(':username')
    getUser(
        @Param('username', new LengthValidationPipe(3, 10)) username: string
    ) {
        return username;
    }
    /*
    🌐 Test URL
    GET http://localhost:3000/users/na
    ❌ Error: username must be between 3 and 10 characters

    GET http://localhost:3000/users/naresh
    ✅ Works
    */
    //✅ 2. Allowed Values Pipe (Enum-like validation)
    @Get()
    filterUsers(
        @Query('role', new AllowedValuesPipe(['admin', 'user'])) role: string
    ) {
        return role;
    }
    /*
    🌐 Test URLs
    GET http://localhost:3000/users?role=admin   ✅
    GET http://localhost:3000/users?role=guest   ❌ role must be one of: admin, user
    */
    //✅ 3. Parse + Range Pipe (multi validation + transform)
    @Get('parserange/:id')
    getUser1(
        @Param('id', new ParseIntRangePipe(1, 100)) id: number
    ) {
        return id;
    }
    /*
    🌐 Test URLs
    GET http://localhost:3000/users/parserange/10   ✅
    GET http://localhost:3000/users/parserange/200  ❌ must be between 1 and 100
    GET http://localhost:3000/users/parserange/abc  ❌ must be a number
    */

    //✅ 4. Trim + Lowercase + Metadata-aware Pipe
    @Get('normalize/search')
    search(
        @Query('keyword', NormalizeStringPipe) keyword: string
    ) {
        console.log('After normalization:', keyword);
        return keyword;
    }
    /*
    🌐 Test
        GET http://localhost:3000/users/normalize/search?keyword=  HELLO  
        Response → "hello"
    */

     //✅ 5. Object Key Validation Pipe (uses metadata deeply)
    @Post()
    createUser(
        @Body(new RequiredFieldsPipe(['name', 'email'])) body: any
    ) {
        return body;
    }
    /*
    🌐 Test
    POST http://localhost:3000/users
    {
    "name": "Naresh",
    "age": 24
    }

    ❌ email is required
    */

}

/*
src/
 └── pipes/
      ├── trim-and-validate.pipe.ts
      ├── length-validation.pipe.ts
      ├── allowed-values.pipe.ts
      ├── parse-int-range.pipe.ts
      ├── normalize-string.pipe.ts
      └── required-fields.pipe.ts
*/