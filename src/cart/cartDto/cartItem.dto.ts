import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";

export class CartItemDto{
    
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsNumber()
    cartId:number;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    quantity: number;

    @IsNumber()
    @IsNotEmpty()
    productId: number;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    totalPrice: number;

    @IsOptional()
    product?: any;

    // @IsNumber()
    // @IsOptional()
    // cartId: number;

}