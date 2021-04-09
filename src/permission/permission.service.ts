import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Permission } from './permission.entity';

@Injectable()
export class PermissionService extends AbstractService{

    constructor(
        
        //qui va pouvoir etre injected
        @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
    ) {
        super(permissionRepository);
    }

    // async all() : Promise<Permission[]> {
    //     return this.permissionRepository.find();
    // }

}
