import { Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from '../../models';
import { Status } from '../../shared/enum/status.enum';
import { IResponseStructureReturn } from '../../shared/interfaces/responsesReturn.interface';
import { BasicService } from '../../shared/services/base.service';
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

    /**
     *  Find all Cars
     *  @return Promise with all cars.
     */
    async findAll(idUser?: number): Promise<Car[]> {
        if (idUser) {
            return this.createQueryBuilder('c')
                .where('c.status <> :status', { status: Status.DELETED })
                .andWhere('c.idUser = :idUser', { idUser })
                .getMany();
        }
        return this.createQueryBuilder()
            .where('status <> :status', { status: Status.DELETED })
            .getMany();
    }

    /**
     * Find Car by id
     * 
     * @param id User id.
     */
    async findById(id: number, response: any): Promise<IResponseStructureReturn> {
        const user = await this.getCarByIdWithRelations(id, response.noPermission);

        return this.formatReturn(response.success, 'user', user);
    }

    /**
     * Get car by id with relations
     * @param id id to find
     * @param response Response in case of error with the structure
     */
    async getCarByIdWithRelations(id: number, response: any) {
        return await this.findOneOrFail(id,
            {
                where: `User.status <> '${Status.DELETED}'`,
                relations: this.relations
            })
            .catch(() => {
                throw new NotFoundException(response);
            });
    }

}
