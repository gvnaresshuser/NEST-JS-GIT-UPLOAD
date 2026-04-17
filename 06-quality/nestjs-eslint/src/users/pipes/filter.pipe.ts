import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class FilterPipe implements PipeTransform {
  //transform(value: any, metadata: ArgumentMetadata) {
  transform(value: any, _metadata: ArgumentMetadata) {
    // value = query params
    if (!value.search) return value;

    /*  value.search = value.search.toLowerCase().trim();
         return value; */
    //--------------------- AVOID DIRECT MUTATION -------------------------
    return {
      ...value,
      search: value.search.toLowerCase().trim(),
    };
    //--------------------- AVOID DIRECT MUTATION -------------------------
  }
}
