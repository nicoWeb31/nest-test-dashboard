import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/common/abstract.service';
import { PaginateResult } from 'src/common/paginate-result-interface';
import { Repository } from 'typeorm';
import { Order } from './models/order.entity';

@Injectable()
export class OrderService extends AbstractService {
    constructor(
        @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    ) {
        super(orderRepo);
    }

    //overrith parent function
    async paginate(
        page: number = 1,
        relations: any[] = [],
    ): Promise<PaginateResult> {
        // const take = 5;//number items per page
        // const [users, total] = await this.userRepository.findAndCount({take, skip: (page -1) * take });

        const { data, meta } = await super.paginate(page, relations);

        return {
            data: data.map((order: Order) => ({
                id: order.id,
                name: order.name,
                email: order.email_name,
                create_at: order.created_at,
                total: order.total,
                orderItems: order.order_Items,
            })),
            meta,
        };
    }

    async chart() {
        return this.orderRepo.query(
            `SELECT DATE_FORMAT(o.created_at, '%Y-%m-%d') as date, sum(i.price * i.quantity)as sum  FROM orders o  JOIN order_item i on o.id = i.order_id GROUP BY created_at;`,
        );
    }
}
