import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Put,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { User } from './models/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcryptjs';
import { UserCreateDto } from './user-create.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Param } from '@nestjs/common';
import { UserUpdateDto } from './user-update.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async all(): Promise<User[]> {
        return this.userService.all();
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User> {
        const pass = await bcrypt.hash('1234', 12);
        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            mail: body.mail,
            password: pass,
        });
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<User> {
        return this.userService.findOne({ id });
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
        await this.userService.update(id, body);
        return this.get(id)
    }


    async delete(@Param('id') id: number): Promise<any>{
        return this.userService.delete(id);
    }
}
