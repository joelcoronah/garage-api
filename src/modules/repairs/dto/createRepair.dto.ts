import { IsNotEmpty } from 'class-validator';

export class CreateRepairDto {

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    idCar: number;
}
