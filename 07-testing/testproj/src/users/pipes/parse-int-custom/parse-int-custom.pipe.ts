import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntCustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    //-----------------------------
    const val = parseInt(value, 10);

    if (isNaN(val)) {
      //throw new BadRequestException('Validation failed. Not a number');
      throw new BadRequestException('Custom Pipe Error: Not a number');
    }
    //-----------------------------
    return val;
  }
}

//----------------------------------------------------------------

/* import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntCustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value;
  }
}
 */