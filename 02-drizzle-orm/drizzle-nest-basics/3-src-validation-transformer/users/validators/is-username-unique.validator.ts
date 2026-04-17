import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsUsernameUnique implements ValidatorConstraintInterface {
    async validate(username: string, args: ValidationArguments) {
        console.log(`Validating username uniqueness for: ${username}`);
        // simulate DB check 
        // If your validator uses DB (service), you must:
        // 1. Add it to providers
        const existingUsers = ['admin', 'test'];
        return !existingUsers.includes(username.toLowerCase());
    }

    defaultMessage(args: ValidationArguments) {
        return `Username '${args.value}' already exists`;
    }
}
/*
{
  "name": "admin",
  "age": "25",
  "isActive": "true",
  "address": {
    "city": "Hyderabad",
    "country": "India"
  }
}
  {
  "name": "test",
  "age": "25",
  "isActive": "true",
  "address": {
    "city": "Hyderabad",
    "country": "India"
  }
}
  -------------------------------
  {
  "message": [
    "Username 'ADMIN' already exists"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
  {
  "message": [
    "Username 'TEST' already exists"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
  -------------------------------
*/
/*
⚠️ Important (Very Common Mistake)

👉 If your validator uses DB (service), you must:

1. Add it to providers
// users.module.ts
providers: [UsersService, IsUsernameUnique]
/*
{
"email": "test@test.com",
  "age": 25,
  "isActive": true,
  "name": "admin",
  "address": {
    "street": "MG Road",
    "city": "Hyderabad",
    "pincode": 500001
  }
}
  -------------------------------
 {
  "message": [
    "Username 'ADMIN' already exists"
  ],
  "error": "Bad Request",
  "statusCode": 400
}
  ==================================
  {
  "email": "test@test.com",
  "age": 25,
  "isActive": true,
  "name": "naressh",
  "address": {
    "street": "MG Road",
    "city": "Hyderabad",
    "pincode": 500001
  }
}
  -------------------------------
{
  "message": "Body transformed",
  "data": {
    "age": 25,
    "isActive": true,
    "name": "NARESSH",
    "address": {
      "city": "Hyderabad",
      "street": "MG Road",
      "pincode": 500001
    },
    "email": "test@test.com"
  },
  "types": {
    "age": "number",
    "isActive": "boolean"
  }
}
*/