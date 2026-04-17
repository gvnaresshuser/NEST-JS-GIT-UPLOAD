import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class TrimAndValidatePipe implements PipeTransform {
  transform(value: any): string {
    console.log('TrimAndValidatePipe - Value before transformation:', value);
    if (value === null || value === undefined) {
      throw new BadRequestException('Value is required');
    }

    if (typeof value !== 'string') {
      throw new BadRequestException('Value must be a string');
    }

    const trimmed = value.trim();
    if (trimmed.length === 0) {
      throw new BadRequestException('Value cannot be empty');
    }
    return trimmed;
  }
}
/*
  transform(value: any, metadata: ArgumentMetadata): string {
  console.log('TrimAndValidatePipe - Value before transformation:', value);
  console.log('TrimAndValidatePipe - Metadata:', metadata);
  console.log(metadata.type); // 'query', 'body', 'param', etc.
  console.log(metadata.data); // The name of the parameter (e.g., 'name')
  console.log(metadata.metatype); // The expected type (e.g., String) 
   
  */
/*
export interface PipeTransform<T = any, R = any> {    
* Method to implement a custom pipe.  Called with two parameters
*
* @param value argument before it is received by route handler method
* @param metadata contains metadata about the value

transform(value: T, metadata: ArgumentMetadata): R;
}

📌 The definition again
export interface PipeTransform<T = any, R = any> {
  transform(value: T, metadata: ArgumentMetadata): R;
}
🔍 What is T?

👉 T = Type of the input value

It represents the type of data coming into the pipe.

🔍 What is R?

👉 R = Return type after transformation

It represents the type of data you return from the pipe.

🧠 Simple meaning
Generic	Meaning
T	Input type
R	Output type
*/