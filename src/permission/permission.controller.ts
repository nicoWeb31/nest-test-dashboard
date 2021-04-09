import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission.service';

@Controller('permission')
export class PermissionController {

    constructor(
        private permissonService: PermissionService,
    ) {}


    @Get()
    all(){
        return this.permissonService.all();
    }
        

}
