import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginateResult } from './paginate-result-interface';

@Injectable()
export abstract class AbstractService {
    constructor(protected readonly repo: Repository<any>) {}

    async all(relations: any[] = []): Promise<any[]> {
        return this.repo.find({relations});
    }

    async create(data): Promise<any> {
        return this.repo.save(data);
    }

    async findOne(condition): Promise<any> {
        return this.repo.findOne(condition);
    }

    async update(id: number, data): Promise<any>{
        return this.repo.update(id, data);
    }

    async delete(id: number): Promise<any> {
        return this.repo.delete(id);
    }

    async paginate(page: number = 1, relations: any[] =[]): Promise<PaginateResult> {
        const take = 5; //number items per page
        const [data, total] = await this.repo.findAndCount({
            take,
            skip: (page - 1) * take,
            relations
        });

        return {
            data: data,
            meta: {
                total: total,
                page,
                last_page: Math.ceil(total / take),
            },
        };
    }
}
