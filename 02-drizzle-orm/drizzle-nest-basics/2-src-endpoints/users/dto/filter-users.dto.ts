import { IsEnum, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
//pnpm add class-validator class-transformer
//add useGlobalPipes(new ValidationPipe()) in main.ts to enable validation globally

export enum UserRole {
  INTERN = 'INTERN',
  ENGINEER = 'ENGINEER',
  ADMIN = 'ADMIN'
}

export class FilterUsersDto {

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  age?: number;
}
//@Type(() => Number) does NOT work when transform: false in ValidationPipe,
// it only works when transform: true. So if you want to use @Type(() => Number)
// to transform the age query parameter to a number, you need to set transform: true
// in the ValidationPipe options in main.ts. If you set transform: false,
// the age query parameter will remain a string and the @Type(() => Number)
// decorator will not have any effect.
//-----------------------------------------------

/* export class FilterUsersDto {

  @IsEnum(UserRole, {
    message: 'Role is required and must be INTERN, ENGINEER, or ADMIN'
  })
  role: UserRole;

  @Type(() => Number)
  @IsInt({ message: 'Age must be a number' })
  age: number;
} */
/*
WITHOUT ANY VALIDATION OR TRANSFORMATION DECORATORS
export class FilterUsersDto {
  role: UserRole;
  age: number;
}
*/