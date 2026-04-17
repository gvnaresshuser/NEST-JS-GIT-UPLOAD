import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
//✅ 4. Trim + Lowercase + Metadata-aware Pipe
@Injectable()
export class NormalizeStringPipe implements PipeTransform<string, string> {
    transform(value: string, metadata: ArgumentMetadata): string {
        console.log('value:', value);
        if (!value) {
            throw new BadRequestException(`${metadata.data} is required`);
        }

        if (typeof value !== 'string') {
            throw new BadRequestException(`${metadata.data} must be string`);
        }

        return value.trim().toLowerCase();
    }
}
/*
📌 Usage
@Get()
search(
  @Query('keyword', NormalizeStringPipe) keyword: string
) {
  return keyword;
}
🌐 Test
GET /users?keyword=  HELLO  

Response → "hello"
*/