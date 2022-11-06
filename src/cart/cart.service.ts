import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { cartDto, CartItemDto, DeliveryDto } from './cartDto';


@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) { }
  private static updateBreaker: boolean = false;
  //needs a validation

  /**
   * This function is used to get the cart details of the user
   *
   * @param userId
   * @returns cart
   */
  async getCartByUserId(userId: any) {
    const cart: cartDto = await this.prisma.cart.findFirst({
      where: {
        userId: parseInt(userId),
      },
      select: {
        id: true,
        userId: true,
        delivery: {
          select: {
            id: true,
            price: true,
            address: true,
            city: true,
          },
        },
        cartItems: {
          select: {
            id: true,
            cartId: true,
            productId: true,
            quantity: true,
            totalPrice: true,
            product: {
              select: {
                id: true,
                name: true,
                price: true,
                image: true,
              },
            },
          },
        },
      },
    });
    if (!cart) {
      return null;
    } else {
      return cart;
    }
  }
  /**
   * This function will check if there is a cart for the user
   * if there is a cart it will return the cart
   * if there is no cart it will create a cart and return it
   * @param id
   * @returns user cart
   */
  async createCart(id: any) {
    //check if cart exist
    let newCart: cartDto;
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId: parseInt(id),
      },
    });
    if (cart) {
      throw new ForbiddenException('Cart already exist');
    } else {
      newCart = await this.prisma.cart.create({
        data: {
          userId: parseInt(id),
          cartItems: {
            create: [],
          },
          delivery: {
            create: [],
          },
        },
      });
      return newCart;
    }
  }

  /**
   * this is a global function that will update the cart, delivery and cartItem
   * I prefered to do it as a unit to avoid multiple calls to the database
   *
   * @param id
   * @param newCart
   * @returns updated cart
   */
  async updateCart(id: any, newCart: cartDto) {
    const cart = await this.prisma.cart.findFirst({
      where: {
        userId: parseInt(id),
      },
      select: {
        id: true,
        userId: true,
        delivery: {
          select: {
            id: true,
            price: true,
            address: true,
            city: true,
          },
        },
        cartItems: {
          select: {
            id: true,
          }
        }
      }
    });
    if (!cart) {
      throw new ForbiddenException('Cart not found');
    } else {
      const cartItems = newCart.cartItems;
      const delivery = newCart.delivery;
      try {
        if (cartItems && cartItems.length >= 0) {
          await this.updateCartItems(cartItems, cart.cartItems);
        }
      } catch (err) {
        throw new ForbiddenException('Cart items not updated, reason:' + err);
      }
      try {
        if (delivery.length != 0) {
          await this.updateDelivery(delivery);
        }
      } catch (err) {
        throw new ForbiddenException('Delivery not updated, reason:' + err);
      }

      if (CartService.updateBreaker === false) {
        return true;
      } else {
        throw new ForbiddenException('Cart not updated');
      }
    }
  }
  /**
   * sub funnction for the update car, updating all the cart items.
   * @param newCartItems 
   * @param oldCartItems 
   * @returns boolean value/error
   */
  async updateCartItems(newCartItems: CartItemDto[], oldCartItems: any) {
    try {
      newCartItems.forEach(async (cartItem) => {
        //check if already registered product;
        if (cartItem.id && oldCartItems.find((item: any) => item.id == cartItem.id)) {
          await this.prisma.cartItem.update({
            where: {
              id: cartItem.id,
            },
            data: {
              quantity: cartItem.quantity,
              totalPrice: cartItem.totalPrice,
            },
          });
        } else {
          //cacth if item is already registered
          const product = await this.prisma.cartItem.findFirst({
            where: {
              cartId: cartItem.cartId,
              productId: cartItem.productId,
            }
          });
          if (product) {
            return;
          }
          //create new product
          await this.prisma.cartItem.create({
            data: {
              cartId: cartItem.cartId,
              productId: cartItem.productId,
              quantity: cartItem.quantity,
              totalPrice: cartItem.totalPrice,
            },
          });
        }
      });
      return true;
    } catch (err) {
      CartService.updateBreaker = true;
      throw new ForbiddenException('Cart items not updated, reason:' + err);
    }
  }

  /**
   *    * sub funnction for the updatee car, updating the delivery.
   * @param delivery 
   * @returns 
   */
  async updateDelivery(delivery: DeliveryDto) {
    try {
      //check if already registered delivery
      const deliveryExist = await this.prisma.delivery.findFirst({
        where: {
          userId: delivery.userId,
        },
      });
      if (deliveryExist) {
        await this.prisma.delivery.update({
          where: {
            id: deliveryExist.id,
          },
          data: {
            price: delivery.price,
            address: delivery.address,
            city: delivery.city,
            userId: delivery.userId,
            cartId: delivery.cartId
          },
        });
      } else {
        //create new delivery
        if (delivery && delivery.price && delivery.address && delivery.city && delivery.userId && delivery.cartId) {
          await this.prisma.delivery.create({
            data: {
              userId: delivery.userId,
              cartId: delivery.cartId,
              price: delivery.price,
              address: delivery.address,
              city: delivery.city,
            },
          });
        }
        return true;
      }
    } catch (err) {
      CartService.updateBreaker = true;
      throw new ForbiddenException('Delivery not updated, reason:' + err);
    }
  }

  async deleteCartItem(cartId: any, cartItemId: any) {

    try {
      const cartItems = await this.prisma.cartItem.findFirst({
        where: {
          cartId: parseInt(cartId),
        },
      });

      if (!cartItems) {
        throw new ForbiddenException('Cart not found');
      }

      const cartItem = await this.prisma.cartItem.delete({
        where: {
          id: parseInt(cartItemId),
        },
      });

      if (!cartItem) {
        throw new ForbiddenException('Cart item not found');
      }
      return true;
    } catch (err) {
      throw new ForbiddenException(
        'Cart item not deleted reason:' + err.message,
      );
    }
  }

  async removeDelivery(userId: any) {
    //find cart
    let cart: cartDto;
    try {
      cart = await this.prisma.cart.findFirst({
        where: {
          userId: parseInt(userId),
        },
        select: {
          id: true,
          delivery: {
            select: {
              id: true,
            }
          }
        }
      });
      if (cart.delivery.length != 0) {
        const response = await this.prisma.delivery.delete({
          where: {
            id: cart.id
          }
        });
        return response;
      }
    } catch (err) {
      throw new ForbiddenException('Cart or Delivery not found reason:' + err.message);
    }
  }

  async deleteCart(userId: any) {
    //find cart
    let cart: cartDto;
    try {
      cart = await this.prisma.cart.findFirst({
        where: {
          userId: parseInt(userId),
        },
      });
    } catch (err) {
      throw new ForbiddenException('Cart not found reson:' + err.message);
    }
    if (cart) {
      try {
        const response = await this.prisma.cart.delete({
          where: {
            id: cart.id
          }
        });
        return response;
      } catch (err) {
        throw new ForbiddenException('failed to relete cart, reason: ' + err.message);
      }
    }
  }

  //   async encodeCart(cart: cartDto) {
  //     const token = await this.jwt.signAsync(cart);
  //     return token;
  //   }
}
