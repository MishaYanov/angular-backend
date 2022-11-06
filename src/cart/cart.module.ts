import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { JwtModule } from '@nestjs/jwt';
import { PdfServiceService } from './pdf-service.service';

@Module({
  imports: [JwtModule],
  providers: [CartService, PdfServiceService],
  controllers: [CartController]
})
export class CartModule {}
