import { Injectable } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class UploadService {
    uploadFile(image: any) {
        const encode = uuidv4();
        console.log(image.originalname);
        image.originalname = encode + ".jpg"
        console.log(image.originalname);
        console.log(image);

        MulterModule.register({
            dest: './public/images',
        });
        return {"img": image.originalname};
    }
}