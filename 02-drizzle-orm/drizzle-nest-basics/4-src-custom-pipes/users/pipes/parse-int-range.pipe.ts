import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';
//✅ 3. Parse + Range Pipe (multi validation + transform)
@Injectable()
export class ParseIntRangePipe implements PipeTransform<string, number> {
    constructor(private min: number, private max: number) { }

    transform(value: string, metadata: ArgumentMetadata): number {
        const num = Number(value);

        if (isNaN(num)) {
            throw new BadRequestException(`${metadata.data} must be a number`);
        }

        if (num < this.min || num > this.max) {
            throw new BadRequestException(
                `${metadata.data} must be between ${this.min} and ${this.max}`
            );
        }

        return num;
    }
}
/*
📌 Usage
@Get(':id')
getUser(
  @Param('id', new ParseIntRangePipe(1, 100)) id: number
) {
  return id;
}
🌐 Test URLs
GET /users/10   ✅
GET /users/200  ❌ must be between 1 and 100
GET /users/abc  ❌ must be a number
*/