import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';

@Controller()
export class UploadController {
    @Post('upload')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename(req, file, collaback) {
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 15).toString())
                        .join();
                    return collaback(
                        null,
                        `${randomName}${extname(file.originalname)}`,
                    );
                },
            }),
        }),
    ) //key
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return {
            url: `http://localhost:8000/api/${file.path}`,
        };
    }

    @Get('uploads/:path')
    async getImage(@Param('path') path: string, @Res() response: Response) {
        response.sendFile(path, { root: 'uploads' });
    }
}
