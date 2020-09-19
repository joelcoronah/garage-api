import { Transform } from 'class-transformer';
import {
    IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString
} from 'class-validator';

export class CreateUserDTO {

    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    mail: string;

    @IsOptional()
    @IsString()
    identityDocument: string | null;

    @IsOptional()
    telephone: string | null;

    @IsOptional()
    address: string | null;
}
