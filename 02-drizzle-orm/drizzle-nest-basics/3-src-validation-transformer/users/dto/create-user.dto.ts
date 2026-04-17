import { Type, Transform } from 'class-transformer';
import { IsString, IsNumber, IsBoolean, ValidateNested, IsPositive, isObject, Validate } from 'class-validator';
import { AddressDto } from './address.dto';
//import { AddressDto, GetUsersDto } from './index';

import { Min, Max } from 'class-validator';
import { IsUsernameUnique } from '../validators/is-username-unique.validator';
//pnpm install class-transformer
//pnpm install class-validator
//OR - in single line
//pnpm install class-transformer class-validator

export class CreateUserDto {

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    @Min(1)   // minimum value allowed
    @Max(75) // maximum value allowed
    age!: number;

    @Type(() => Boolean)
    @IsBoolean()
    isActive!: boolean;

    //@Transform(({ value }) => value.toUpperCase())
    @Transform(({ value }) =>
        typeof value === 'string' ? value.toLowerCase() : value
    )   
    @IsString()    
    //@IsNumber() //--try this to test name as number
    @Validate(IsUsernameUnique) //-- CUSTOM VALIDATOR (ASYNC) - to check username uniqueness in DB
    name!: string;


    @Type(() => AddressDto)
    @ValidateNested()
    address!: AddressDto;
}

/* import { AddressDto } from "./address.dto";

export class CreateUserDto {
age: number;
isActive: boolean;
name: string;
address: AddressDto;
} */

/*
POST /users
{
  "name": "naresh",
  "age": "25",
  "isActive": "true",
  "address": {
    "city": "Hyderabad",
    "country": "India"
  }
}
*/
