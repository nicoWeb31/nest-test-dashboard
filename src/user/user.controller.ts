import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService,
    ) {}

    @Get()
    async all():Promise<User[]>{
        return this.userService.all();
    }

    @Post()
    async create(@Body() body):Promise<User>{
        return this.userService.create(body);
    }
}
