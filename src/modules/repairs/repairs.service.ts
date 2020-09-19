import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repair } from 'src/models/repair.entity';
import { Status } from 'src/shared/enum/status.enum';
import { BasicService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { CreateRepairDto } from './dto/createRepair.dto';

@Injectable()
export class RepairsService extends BasicService<Repair> {

    private relations = [];

    constructor(
        @InjectRepository(Repair)
        private readonly repairsRepository: Repository<Repair>
    ) { 
        super(repairsRepository);
    }

    async create(data: CreateRepairDto, response: any): Promise<any> {

        const newRepair = await this.save(data)
            .catch(() => {
                throw new InternalServerErrorException(response.error);
            });
        
        return this.formatReturn(response.success, 'repair', newRepair);
    }

    /**
     *  Find all Repairs
     *  @return Promise with all repairs.
     */
    async findAll(idCar?: number): Promise<Repair[]> {
        if (idCar) {
            return this.createQueryBuilder('c')
                .where('c.status <> :status', { status: Status.DELETED })
                .andWhere('c.idCar = :idCar', { idCar })
                .getMany();
        }
        return this.createQueryBuilder()
            .where('status <> :status', { status: Status.DELETED })
            .getMany();
    }
}
