import {
    Body, Controller, Delete, Get, Param,
    Patch, Post, Put, Req, UnauthorizedException, UseInterceptors, UsePipes
} from '@nestjs/common';
import { User } from 'src/models';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';
import { userResponses } from '../../shared/responses/users.response';
import { CreateUserDTO } from './dto/createUserDTO.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

    constructor(
        private readonly userService: UsersService
    ) { }


    /**
     *  Responsible for creating the user
     * @param data object with the required data to create the user 
     */
    @UsePipes(new ValidationPipe())
    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data, userResponses.creation);
    }

    /**
     * Get all users.
     * @returns Promise with alls users.
     */
    @Get()
    async findAll(): Promise<any> {
        return await this.userService.findAll();
    }
}
