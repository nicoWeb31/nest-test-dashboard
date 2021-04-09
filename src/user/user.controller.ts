import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Post,
    Put,
    Req,
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
import { Query } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';

@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) {}

    @Get()
    async all(@Query('page') page: number = 1): Promise<any> {
        return this.userService.paginate(page, ['role']);
    }

    @Post()
    async create(@Body() body: UserCreateDto): Promise<User> {
        // console.log("🚀 ~ file: user.controller.ts ~ line 34 ~ UserController ~ create ~ body", body)
        const pass = await bcrypt.hash('1234', 12);

        const { role_id } = body;

        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            mail: body.mail,
            password: pass,
            role: { id: role_id }, //pass role with obj
        });
    }

    @Get(':id')
    async get(@Param('id') id: number) {
        return this.userService.findOne(id, ['role']);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: UserUpdateDto) {
        const { role_id, ...data } = body;
        await this.userService.update(id, {
            data,
            role: { id: role_id },
        });
        return this.get(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return this.userService.delete(id);
    }

    @Put('info')
    async userInfoUpdate(@Body() body: UserUpdateDto, @Req() req: Request) {
        console.log('update user info');
        const id = await this.authService.userId(req);
        await this.userService.update(id, body);

        return this.get(id);
    }
}
