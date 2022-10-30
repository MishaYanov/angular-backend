import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class itemDto{
    
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    price: number;

    @IsString()
    @IsOptional()
    image: string;

    @IsNumber()
    @IsNotEmpty()
    carCategoryId: number;

    @IsNumber()
    @IsNotEmpty()
    partCategoryId: number;

}