import { IsEnum, IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';
//pnpm add class-validator class-transformer

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