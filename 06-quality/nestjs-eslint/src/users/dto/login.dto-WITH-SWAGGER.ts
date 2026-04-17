import { IsEmail, IsString } from 'class-validator';

// 🔥 Swagger
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'naresh@gmail.com',
    description: 'Registered user email address',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '123456',
    description: 'User password',
  })
  @IsString()
  password!: string;
}
