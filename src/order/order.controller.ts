import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    Query,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
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
}
