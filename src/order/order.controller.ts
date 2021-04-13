import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Query,
    Res,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { Parser } from 'json2csv';
import { AuthGuard } from 'src/auth/auth.guard';
import { OrderItem } from './models/order-item.entity';
import { Order } from './models/order.entity';
import { OrderService } from './order.service';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class OrderController {
    constructor(private orderService: OrderService) {}

    // @Get('orders')
    // async all(@Query('page') page: number = 1) {
    //     return this.orderService.all(['order_Items']);
    //     // return this.orderService.paginate(page, ['order_Items']);

    // }

    @Get('orders')
    async all(@Query('page') page: number = 1) {
        return this.orderService.all(['order_Items']);
        // return this.orderService.paginate(page, ['order_Items']);
    }

    @Post('export')
    async export(@Res() response: Response) {
        const parser = new Parser({
            fields: ['ID', 'Name', 'Email', 'Price', 'Quantity'],
        });

        const orders = await this.orderService.all(['order_Items']);

        const json = [];

        orders.forEach((o: Order) => {
            json.push({
                ID: o.id,
                Name: o.name,
                Email: o.email_name,
                'Product Title': '',
                Price: '',
                Quantity: '',
            });

            o.order_Items.forEach((orderItem: OrderItem) => {
                json.push({
                    ID: '',
                    Name: '',
                    Email: '',
                    'Product Title': orderItem.product_title,
                    Price: orderItem.price,
                    Quantity: orderItem.quantity,
                });
            });
        });

        const csv = parser.parse(json);
        response.header('Content-Type', 'text/csv');
        response.attachment('order.csv');
        return response.send(csv);
    }

    @Get('chart')
    async chart() {
        return this.orderService.chart();
    }
}
