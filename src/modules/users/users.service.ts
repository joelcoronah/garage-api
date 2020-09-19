import { Injectable, InternalServerErrorException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models';
import { Status } from 'src/shared/enum/status.enum';
import { BasicService } from 'src/shared/services/base.service';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/createUserDTO.dto';
import { UserUniqueFieldsDto } from './dto/unique.dto';

@Injectable()
export class UsersService extends BasicService<User> {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { 
        super(userRepository);
    }

    async create(data: CreateUserDTO, response: any): Promise<any> {
        await this.validateUniqueFields(data, response);

        const newUser = await this.save(data)
            .catch(() => {
                throw new InternalServerErrorException(response.error);
            });
        
        return this.formatReturn(response.success, 'user', newUser);
    }

    /**
     * function responsible for the validation of the fields that have to be unique in users
     * @param data unique fields for users
     * @param response response in case of error 
     */
    async validateUniqueFields(data: UserUniqueFieldsDto, response: any, id?: number):
        Promise<boolean> {

        let query = this.userRepository.createQueryBuilder('u');

        if (id) {
            query = query.andWhere('u.id <> :id', { id });
        }

        if (data.identityDocument) {
            query = query.andWhere('(u.identityDocument iLIKE :doc', { doc: data.identityDocument })
                .andWhere('u.status <> :status', { status: Status.DELETED })
                .orWhere('u.mail iLIKE :mail)', { mail: data.mail });
        } else {
            query = query.andWhere('(u.mail iLIKE :mail', { mail: data.mail })
                .andWhere('u.status <> :status)', { status: Status.DELETED });
        }

        const user = await query.getOne();

        if (!user) {
            return true;
        }

        if (data.mail.toLowerCase() === user.mail.toLocaleLowerCase()) {
            throw new NotAcceptableException(response.mailExists);
        }

        throw new NotAcceptableException(response.documentExists);
    }

    /**
     *  Find all Users
     *  @return Promise with all users.
     */
    async findAll(): Promise<User[]> {
        return this.createQueryBuilder()
            .where('status <> :status', { status: Status.DELETED })
            .getMany();
    }

}
