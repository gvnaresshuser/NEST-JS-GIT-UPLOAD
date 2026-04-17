import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddressDto {
    @IsString()
    city!: string;

    @IsString()
    //@IsOptional()
    @IsNotEmpty()
    country!: string;
}


/* export class AddressDto {
    city: string;
    country: string;
}
 */



/*
If country is mandatory
👉 Just remove @IsOptional()
*/
/*
🚨 Why it still accepts missing country

👉 Because of this:

@IsOptional()
🔥 Behavior:
If country is NOT present → all other validations are skipped ✅
If country is present → then @IsString() + @IsNotEmpty() run
*/