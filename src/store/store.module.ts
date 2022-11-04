import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { UploadService } from './upload.service';

@Module({
  controllers: [StoreController],
  providers: [StoreService, UploadService]
})
export class StoreModule {}
