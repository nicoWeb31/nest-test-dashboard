import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { NotFoundException } from '@nestjs/common';

@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
    ) {

    }


    @Post('register')
    async register(@Body() body:RegisterDto): Promise<any> {
        const passwordHash = await bcrypt.hash(body.password, 12);

        if(body.password !== body.passwordConfirm){
            throw new BadRequestException('password do not match');
        }

        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            mail: body.mail,
            password: passwordHash,
        });
        
    }


    @Post('login')
    async login(
        @Body('mail') mail: string,
        @Body('password') password: string,
    ) {

        //searhc user
        const user = await this.userService.findOne({mail: mail});

        if(!user){
            throw new NotFoundException('user not found');
        }

        const comparePass = bcrypt.compare(password, (await user).password);

        if(!comparePass) {
            throw new BadRequestException('Invalid credentials');
        }

        return user
    }

}
