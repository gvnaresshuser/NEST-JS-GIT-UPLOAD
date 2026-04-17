import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
//✅ 5. Object Key Validation Pipe (uses metadata deeply)
@Injectable()
export class RequiredFieldsPipe implements PipeTransform {
    constructor(private requiredFields: string[]) { }

    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'body') return value;

        for (const field of this.requiredFields) {
            if (!value[field]) {
                throw new BadRequestException(`${field} is required`);
            }
        }

        return value;
    }
}
/*
📌 Usage
@Post()
createUser(
  @Body(new RequiredFieldsPipe(['name', 'email'])) body: any
) {
  return body;
}
🌐 Test
POST /users
{
  "name": "Naresh"
}

❌ email is required
*/