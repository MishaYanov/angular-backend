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
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { JwtGuard } from 'src/auth/guard';
import { itemDto } from './dto/item.dto';
import { StoreService } from './store.service';

//jwt guard will be implemented here
// @UseGuards(JwtGuard)
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
    console.log(newItem);
    return this.storeService.addItem(newItem);
  }
  //update item
  @Put(':id')
  updateItem(@Body() newItem: itemDto) {
    console.log(newItem);
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
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i',
        })
        .addMaxSizeValidator({
          maxSize: 10000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);  
    console.log(__dirname);
    MulterModule.register({
        dest: __dirname + '../public/images',
      });
  }
}
