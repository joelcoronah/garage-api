import {
    IsEmail, IsNotEmpty, IsOptional, IsString
} from 'class-validator';

export class CarUniqueFieldsDto {

    @IsNotEmpty()
    @IsEmail()
    plate: string;

    @IsOptional()
    @IsString()
    identityDocument?: string | null;
}
