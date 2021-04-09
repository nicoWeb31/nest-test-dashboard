import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './models/register.dto';
import { NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { Req } from '@nestjs/common';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@UseInterceptors(ClassSerializerInterceptor, AuthInterceptor)
@Controller()
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private authService: AuthService,
    ) {}

    @Post('register')
    async register(@Body() body: RegisterDto): Promise<any> {
        const passwordHash = await bcrypt.hash(body.password, 12);

        if (body.password !== body.passwordConfirm) {
            throw new BadRequestException('password do not match');
        }

        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            mail: body.mail,
            password: passwordHash,
            role: { id: 1 },
        });
    }

    @Post('login')
    async login(
        @Body('mail') mail: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
    ) {
        //searhc user
        const user = await this.userService.findOne({ mail: mail });

        if (!user) {
            throw new NotFoundException('user not found');
        }

        const comparePass = bcrypt.compare(password, (await user).password);

        if (!comparePass) {
            throw new BadRequestException('Invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({ id: user.id });

        response.cookie('jwt', jwt, { httpOnly: true });
    }

    //get User by jwt
    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request) {
        const id = await this.authService.userId(request);

        return await this.userService.findOne({ id });
    }

    @UseGuards(AuthGuard)
    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        response.clearCookie('jwt');
        return {
            message: 'Logged with success',
        };
    }
}
