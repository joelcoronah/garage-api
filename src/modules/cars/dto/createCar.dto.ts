import { IsNotEmpty } from 'class-validator';

export class CreateCarDto {

    @IsNotEmpty()
    model: string;

    @IsNotEmpty()
    color: string;

    @IsNotEmpty()
    plate: string;

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    idUser: string;
}
