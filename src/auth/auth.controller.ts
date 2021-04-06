import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/user/models/user.entity';
import { UserService } from 'src/user/user.service';

@Controller()
export class AuthController {

    constructor(
        private userService: UserService,
    ) {

    }


    @Post('register')
    async register(@Body() body:User): Promise<any> {
        return this.userService.create(body)
        
    }
}
