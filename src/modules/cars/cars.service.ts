import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from 'src/models';
import { Status } from 'src/shared/enum/status.enum';
import { BasicService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/createCar.dto';
import { CarUniqueFieldsDto } from './dto/unique.dto';

@Injectable()
export class CarsService extends BasicService<Car> {

    private relations = [];

    constructor(
        @InjectRepository(Car)
        private readonly carRepository: Repository<Car>
    ) { 
        super(carRepository);
    }

    async create(data: CreateCarDto, response: any): Promise<any> {

        await this.validateUniqueFields(data, response);
        
        const newCar = await this.save(data)
            .catch(() => {
                throw new InternalServerErrorException(response.error);
            });
        
        return this.formatReturn(response.success, 'car', newCar);
    }

    /**
     * function responsible for the validation of the fields that have to be unique in Cars
     * @param data unique fields for Cars
     * @param response response in case of error 
     */
    async validateUniqueFields(data: CarUniqueFieldsDto, response: any, id?: number):
        Promise<boolean> {

        let query = this.createQueryBuilder('u');

        if (id) {
            query = query.andWhere('u.id <> :id', { id });
        }

        if (data.plate) {
            query = query.andWhere('(u.plate iLIKE :plate', { plate: data.plate })
                .andWhere('u.status <> :status)', { status: Status.DELETED });
        } else {
            query = query.andWhere('u.status <> :status)', { status: Status.DELETED });
        }

        const car = await query.getOne();

        if (!car) {
            return true;
        }

        if (data.plate.toLowerCase() === car.plate.toLocaleLowerCase()) {
            throw new NotAcceptableException(response.plateExist);
        }

    }

}
