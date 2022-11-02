import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { JwtModule } from '@nestjs/jwt';
import { PdfServiceService } from './pdf-service.service';
import { UploadService } from './upload.service';

@Module({
  imports: [JwtModule],
  providers: [CartService, PdfServiceService, UploadService],
  controllers: [CartController]
})
export class CartModule {}
