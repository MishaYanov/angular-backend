import { IsString, IsNotEmpty, IsOptional, Length, IsNumber} from "class-validator";
import { CartItemDto, DeliveryDto } from "./index";

export class cartDto{
    
    @IsNumber()
    @IsNotEmpty()
    id?: number;

    @IsNumber()
    @IsNotEmpty()
    userId?:number;

    @IsOptional()
    cartItems?: CartItemDto[];

    @IsOptional()
    delivery?: DeliveryDto | any;

}