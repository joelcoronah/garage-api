import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import { ValidationPipe } from 'src/shared/pipes/validation.pipe';
import { repairResponses } from 'src/shared/responses/repairs.response';
import { CreateRepairDto } from './dto/createRepair.dto';
import { RepairsService } from './repairs.service';

@Controller('repairs')
export class RepairsController {

    constructor(
        private readonly repairsService: RepairsService
    ) { }

     /**
     *  Responsible for creating the repair
     * @param data object with the required data to create the repair 
     */
    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() data: CreateRepairDto) {
        return this.repairsService.create(data, repairResponses.creation);
    }

    /**
     * Get all repairs.
     * @returns Promise with alls repairs.
     */
    @Get()
    async findAll(@Query('idCar') idCar: number): Promise<any> {
        return await this.repairsService.findAll(idCar);
    }
}
