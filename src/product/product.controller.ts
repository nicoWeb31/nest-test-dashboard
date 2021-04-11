import { Delete, Put } from '@nestjs/common';
import { Body, Param } from '@nestjs/common';
import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProductCreateDto } from './models/product-create.dto';
import { ProductUpdateDto } from './models/product-update.dto';
import { Product } from './models/product.entity';
import { ProductService } from './product.service';

@UseGuards(AuthGuard)
@Controller('products')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    async all(@Query('page') page: number = 1) {
        return await this.productService.paginate(page);
    }

    @Post()
    async create(@Body() body: ProductCreateDto) {
        return this.productService.create(body);
    }

    @Get(':id')
    async one(@Param('id') id: number) {
        return this.productService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id : number, @Body() body : ProductUpdateDto) {

        await this.productService.update(id, body);
        return await this.one(id);

    }


    @Delete(':id')
    async delete(@Param('id') id: number){
        return this.productService.delete(id);
    }
}
