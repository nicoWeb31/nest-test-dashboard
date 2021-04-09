
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginateResult } from 'src/common/paginate-result-interface';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';


//service batabase call 

@Injectable()
export class UserService extends AbstractService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super(userRepository)
    }



    // async all(): Promise<User[]> {
    //     return this.userRepository.find();
    // }

    // async create(data): Promise<User> {
    //     return this.userRepository.save(data);
    // }

    // async findOne(condition): Promise<User> {
    //     return this.userRepository.findOne(condition);
    // }

    // async update(id: number, data): Promise<any>{
    //     return this.userRepository.update(id, data);
    // }

    // async delete(id: number): Promise<any> {
    //     return this.userRepository.delete(id);
    // }


    //overrith parent function
    async paginate (page : number = 1, relations : any[] = []): Promise<PaginateResult> {
        // const take = 5;//number items per page
        // const [users, total] = await this.userRepository.findAndCount({take, skip: (page -1) * take });

        const {data , meta} = await super.paginate(page, relations)

        return {
            data : data.map( u => {
                const {password, ...data} = u;
                return data;
            }),
            meta
        };

    }
}
