
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.entity';


//service batabase call 

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}



    async all(): Promise<User[]> {
        return this.userRepository.find();
    }

    async create(data): Promise<User> {
        return this.userRepository.save(data);
    }

    async findOne(condition): Promise<User> {
        return this.userRepository.findOne(condition);
    }

    async update(id: number, data): Promise<any>{
        return this.userRepository.update(id, data);
    }

    async delete(id: number): Promise<any> {
        return this.userRepository.delete(id);
    }

    async paginate (page : number = 1): Promise<any> {
        const take = 5;//number items per page
        const [users, total] = await this.userRepository.findAndCount({take, skip: (page -1) * take });

        return {
            data : users.map( u => {
                const {password, ...data} = u;
                return data;
            }),
            meta: {
                total: total,
                page,
                last_page : Math.ceil(total/take)
            }
        };

    }
}
