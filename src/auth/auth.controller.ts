import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcryptjs';

@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
    ) {

    }


    @Post('register')
    async register(@Body() body:User): Promise<any> {
        const passwordHash = await bcrypt.hash(body.password, 12);

        return this.userService.create({
            first_name: body.first_name,
            last_name: body.last_name,
            mail: body.mail,
            password: passwordHash,
        });
        
    }
}
