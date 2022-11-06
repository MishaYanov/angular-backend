import { Controller, Delete, Get, HttpCode, Patch, PipeTransform, Post, Put, UseGuards } from '@nestjs/common';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CartService } from './cart.service';
import { cartDto } from './cartDto';
import { PdfServiceService } from './pdf-service.service';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService, private pdfBuilder: PdfServiceService) {}
  @Get('/:id')
  async getCartByUserId(@Param('id') id: number) {
    try {
      const cart = await this.cartService.getCartByUserId(id);
      return cart;
    } catch {
      return null;
    }
  }

  @Post('/:id')
  async createCart(@Param('id') userId: number) {
    try {
      const cart = await this.cartService.createCart(userId);
      return cart;
    } catch {
      return null;
    }
  }

  @HttpCode(200)
  @Put('/:id')
  async updateCart(@Param('id') id:any, @Body() newCart: any) {  
    try {      
      const response = await this.cartService.updateCart(id, newCart).then((res) => {
        if(res){
          return {msg:'Cart updated'};
        }
      });
      if(response){
        return {msg:'Cart updated'};
      }
    } catch (err){
      throw new Error(err.message);
    }
  }
  
  @Delete('/:cart/cartitem/:cartitemid')
  async deleteCartItem(@Param('cart') cartId: number, @Param('cartitemid') cartiItemId: number) {
    try {
      if(cartId && cartiItemId){
      const response = await this.cartService.deleteCartItem(cartId, cartiItemId);
      if(response){
        return {msg:'Item deleted'};
      }
      }else{
         throw new Error('CartId or CartItemId is missing');
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  @Delete('/:userId')
  deleteCart(@Param('userId') id: number) {
    try {
      if(id >= 0){
        const response = this.cartService.deleteCart(id);
        return response;
      }else{
        throw new Error('This a wrong id no one can have such number!')
      }
    } catch (err) {
      throw new Error('Somthing bad happened when deleting your cart'+ err.message);
    }
  }
  
  @Delete('/delivery/:userId')
  removeDelivery(@Param('userId') id: number) {
    try {
      if(id >= 0){
        const response = this.cartService.removeDelivery(id);
      }else{
        throw new Error('This a wrong id no one can have such number!')
      }
    } catch (error) {
      
    }

  }
  @Post('/submit/:id')
  finalizeSale(@Param('id') id:number,@Body() cart: cartDto)  {
    //send receipt to email
    // this.pdf
    //delete cart
    this.cartService.deleteCart(id)
  }
  @Get('/history/:id')
  getHistory() {}
}
