import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
/*
✅ 1. Length Validation Pipe (Dynamic Config)
👉 Takes min & max via constructor (extra parameter usage)
*/
@Injectable()
export class LengthValidationPipe implements PipeTransform<string, string> {
    constructor(private min: number, private max: number) { }

    transform(value: string, metadata: ArgumentMetadata): string {
        if (!value) {
            throw new BadRequestException(`${metadata.data} is required`);
        }

        if (value.length < this.min || value.length > this.max) {
            throw new BadRequestException(
                `${metadata.data} must be between ${this.min} and ${this.max} characters`
            );
        }

        return value;
    }
}
/*
📌 Usage
@Get(':username')
getUser(
  @Param('username', new LengthValidationPipe(3, 10)) username: string
) {
  return username;
}
🌐 Test URL
GET http://localhost:3000/users/na
❌ Error: username must be between 3 and 10 characters

GET http://localhost:3000/users/naresh
✅ Works
*/