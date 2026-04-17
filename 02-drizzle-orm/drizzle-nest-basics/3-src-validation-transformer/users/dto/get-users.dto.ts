//-------------------------- WILL NOT WORK -----------------------------------
/* import { Type } from 'class-transformer';

export class GetUsersDto {
    @Type(() => Number)
    limit: number;

    @Type(() => Boolean)
    active: boolean;
} */
//OUTPUT
/*
{
  "message": [
    "property limit should not exist",
    "property active should not exist"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
*/
//------------------------- WILL WORK ------------------------------------
import { Type } from 'class-transformer';
import { IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class GetUsersDto {
  @IsNumber()
  @Type(() => Number)
  limit!: number;

  @IsBoolean()
  @Type(() => Boolean)
  active!: boolean;
}
//Property 'limit' has no initializer and is not definitely assigned in the constructor
//add ! after property name to tell TypeScript that it will be assigned at runtime by NestJS
//Don't worry, NestJS will assign this at runtime"
//OUTPUT
/*
{
  "message": "Query transformed",
  "data": {
    "limit": 5,
    "active": true
  },
  "types": {
    "limit": "number",
    "active": "boolean"
  }
}
*/

//-------------------------------------------------------------

/*
//NOT HAVING ATLEAST ONE VALIDATOR - AND IF USING WHITELIST OR FORBIDNONWHITELISTED 
// - THEN TRANSFORM WON'T WORK
import { Type } from 'class-transformer';

export class GetUsersDto {
    @Type(() => Number)
    limit: number;

    @Type(() => Boolean)
    active: boolean;
}
*/
/*
✅ ValidationPipe Options for Transformation
app.useGlobalPipes(

    new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }),
);
//-----------------------------------------
SO DTO CLASS SHOULD HAVE ATLEAST ONE VALIDATOR DECORATOR FOR TRANSFORM TO WORK
import { Type } from 'class-transformer';
import { IsNumber, IsBoolean } from 'class-validator';

export class GetUsersDto {
    @IsNumber()
    @Type(() => Number)
    limit: number;

    @IsBoolean()
    @Type(() => Boolean)
    active: boolean;
}
*/