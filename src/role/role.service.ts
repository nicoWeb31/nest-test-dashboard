
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

@Injectable()
export class RoleService extends AbstractService {

    constructor(
        @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    ){
        super(roleRepository);
    }


    // async all():Promise<Role[]> {
    //     return this.roleRepository.find();
    // }

    // async create(data): Promise<Role> {
    //     return this.roleRepository.save(data);
    // }

    // async findOne(condition): Promise<Role> {
    //     //Avec les relations
    //     return this.roleRepository.findOne(condition, {relations: ['permission']});
    // }

    // async update(id: number, data): Promise<any>{
    //     return this.roleRepository.update(id, data);
    // }

    // async delete(id: number): Promise<any> {
    //     return this.roleRepository.delete(id);
    // }
}
