import { Controller, Delete, Get, HttpCode, Patch, Post, Put, UseGuards } from '@nestjs/common';
import {
  Body,
  Param,
} from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CartService } from './cart.service';
import { cartDto } from './cartDto';

@UseGuards(JwtGuard)
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}
  @Get('/:id')
  async getCartByUserId(@Param('id') id: number) {
    try {
      const cart = await this.cartService.getCartByUserId(id);
      return cart;
    } catch {
      return 'null';
    }
  }

  @Post('/:id')
  async createCart(@Param('id') id: number) {
    try {
      const cart = await this.cartService.createCart(id);
      return cart;
    } catch {
      return null;
    }
  }

  @HttpCode(200)
  @Put('/:id')
  async updateCart(@Param('id') id:any, @Body() newCart: any) {
    try {      
      console.log(newCart)
      const response = await this.cartService.updateCart(id, newCart);
      if(response){
        console.log(response);
        return response;
      }else{
        return HttpCode(400);
      }
    } catch (err){
      throw new Error(err.message);
    }
  }
  
  @Delete('/:cart/cartitem/:cartitemid')
  async deleteCartItem(@Param('cart') cartId: number, @Param('cartitemid') cartiItemId: number) {
    try {
      if(cartId && cartiItemId){
        console.log(cartId, cartiItemId);
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

  @Delete('/:id')
  deleteCart(dto: cartDto) {}
  @Post('/delivery')
  submitDelivery() {}
  @Delete('/delivery/:id')
  removeDelivery() {}
  @Post('/submit')
  finalizeSale() {
    //send receipt to email
    //delete cart
    //save sale to history
  }
  @Get('/history/:id')
  getHistory() {}
}
