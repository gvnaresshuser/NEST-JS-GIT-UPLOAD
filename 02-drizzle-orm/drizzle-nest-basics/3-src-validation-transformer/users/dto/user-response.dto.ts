import { Exclude, Expose } from 'class-transformer';

//@Exclude() // Exclude all fields by default, then use @Expose to include specific fields
export class UserResponseDto {
    id!: number;

    @Expose({ name: 'user_name' })
    name!: string;

    @Exclude()
    email!: string;

    age!: number;

    @Exclude()
    password!: string;
}
/*
✅ @Expose()

👉 Allows / customizes a field in response

@Expose({ name: 'user_name' })
name: string;
🧪 What it does
Renames name → user_name
//----------------------------------------
✅ @Exclude()

👉 Hides a field from the response

@Exclude()
password: string;
🧪 Example
user.password = 'secret123';

👉 Response:

{
  "id": 1,
  "user_name": "naresh",
  "email": "test@gmail.com",
  "age": 25
}

✔ password is removed
*/