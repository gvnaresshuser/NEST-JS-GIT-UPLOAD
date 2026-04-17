import { IsEmail, IsString, Length, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  @Length(3, 50)
  name!: string;

  @IsEmail()
  email!: string;

  // ✅ NEW PASSWORD FIELD
  @IsString()
  @Length(6, 20)
  password!: string;

  // OPTIONAL AGE
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  age?: number;
}
