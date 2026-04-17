import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
//✅ 2. Allowed Values Pipe (Enum-like validation)
@Injectable()
export class AllowedValuesPipe implements PipeTransform {
    constructor(private allowedValues: string[]) { }

    transform(value: any, metadata: ArgumentMetadata) {
        if (!this.allowedValues.includes(value)) {
            throw new BadRequestException(
                `${metadata.data} must be one of: ${this.allowedValues.join(', ')}`
            );
        }
        return value;
    }
}
/*
📌 Usage
@Get()
filterUsers(
  @Query('role', new AllowedValuesPipe(['admin', 'user'])) role: string
) {
  return role;
}
🌐 Test URLs
GET /users?role=admin   ✅
GET /users?role=guest   ❌ role must be one of: admin, user
*/