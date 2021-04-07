import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {

    constructor(
        private roleService: RoleService,
    ) {}

    @Get()
    async all() : Promise<Role[]> {
        return this.roleService.all();
    }

    

}
