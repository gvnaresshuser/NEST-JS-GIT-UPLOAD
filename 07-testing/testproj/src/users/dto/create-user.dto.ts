import { IsEmail, IsString, Length, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

// 🔥 Swagger
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({
    example: 'Naressh',
    description: 'User full name (3 to 50 characters)',
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @Length(3, 50)
  name!: string;

  @ApiProperty({
    example: 'naresh@gmail.com',
    description: 'Valid email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '123456',
    description: 'Password (6 to 20 characters)',
    minLength: 6,
    maxLength: 20,
  })
  @IsString()
  @Length(6, 20)
  password!: string;

  // ✅ OPTIONAL FIELD
  @ApiPropertyOptional({
    example: 25,
    description: 'Optional age of the user',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  age?: number;
}