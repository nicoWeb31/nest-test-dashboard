import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';


@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
    ) {}


    //recup id user with jwt
    async userId( request: Request) : Promise<number> {
        const cookie = request.cookies['jwt'];
        const data = await this.jwtService.verifyAsync(cookie);
        console.log("🚀 ~ file: auth.service.ts ~ line 17 ~ AuthService ~ userId ~ data", data)
        return data['id'];
    }
}
