import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { JwtGuard } from 'src/auth/guard';
import { itemDto } from './dto/item.dto';
import { StoreService } from './store.service';

//jwt guard will be implemented here
@UseGuards(JwtGuard)
@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}

  //get all itmes
  @Get()
  async getAllItems() {
    return this.storeService.getAllItems();
  }
  @Post()
  addItem(@Body() newItem: itemDto) {
    return this.storeService.addItem(newItem);
  }
  //update item
  @Put(':id')
  updateItem(@Body() newItem: itemDto) {
    return this.storeService.updateItem(newItem);
  }
  //delete item
  @Delete(':id')
  deleteItem(@Param('id') id: number) {
    return this.storeService.deleteItem(id);
  }
  @Get('car/categories')
  async getCarCategories() {
    return this.storeService.getAllCarCategories();
  }
  @Get('part/categories')
  async getPartCategories() {
    return this.storeService.getAllPartCategories();
  }


  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{
    storage: diskStorage({
      destination: __dirname + '/../../public/images',
      filename: (req, file, cb) => {
        const filename = uuidv4();
        const extension = file.originalname.split('.')[1];
        cb(null, `${filename}.${extension}`);
      }
    }),
  }))
  async uploadFile(@Body() body:any, @UploadedFile() file: Express.Multer.File) {
    return {file: file.filename};
  }  
}


