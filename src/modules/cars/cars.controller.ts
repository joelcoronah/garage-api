import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { carResponses } from 'src/shared/responses/cars.response';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/createCar.dto';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) { }


    /**
     *  Responsible for creating the car
     * @param data object with the required data to create the car 
     */
    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() data: CreateCarDto) {
        return this.carsService.create(data, carResponses.creation);
    }

    /**
     * Get all cars.
     * @returns Promise with alls cars.
     */
    @Get()
    async findAll(@Query('idUser') idUser: number): Promise<any> {
        return await this.carsService.findAll(idUser);
    }

}
