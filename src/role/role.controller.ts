import { Body, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Role } from './role.entity';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Get()
    async all(): Promise<Role[]> {
        return this.roleService.all();
    }

    @Post()
    async create(
        @Body('name') name: string,
        @Body('permission') permissionsID: number[],
    ) {
        /*
            [1,2,3] return [{id : 1}, {id : 2}, {id : 3}]  
            */
        return this.roleService.create({
            name,
            permission: permissionsID.map((id) => ({ id : id })),
        });
    }

    @Get(':id')
    async get(@Param('id') id: number): Promise<Role> {
        return this.roleService.findOne({ id: id}, ['permission']);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body('name') name: string,
        @Body('permission') permissionsID: number[],
    ) {
        await this.roleService.update(id, {
            name,
        });
        const role =  this.get(id);
        return this.roleService.create({
            ...role,
            permission : permissionsID.map((id) => ({ id : id }))
        })
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<any> {
        return this.roleService.delete(id);
    }
}
