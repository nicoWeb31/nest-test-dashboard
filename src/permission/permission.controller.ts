import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { PermissionService } from './permission.service';

@UseGuards(AuthGuard)
@Controller('permission')
export class PermissionController {
    constructor(private permissonService: PermissionService) {}

    @Get()
    all() {
        return this.permissonService.all();
    }
}
