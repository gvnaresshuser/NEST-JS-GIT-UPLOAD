import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name is required' })
    name!: string;

    @IsEmail({}, { message: 'Invalid email format' })
    email!: string;

    @MinLength(6, { message: 'Password must be at least 6 characters' })
    password!: string;

     @MinLength(6, { message: 'Address must be at least 6 characters' })
    address!: string;

    @MinLength(6, { message: 'Profession must be at least 6 characters' })
    profession!: string;

}
/* export class CreateUserDto {}
 */