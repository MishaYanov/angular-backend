import { IsEmail, IsString, IsNotEmpty, IsOptional, Length, IsNumber} from "class-validator";

export class AuthDto {
    
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsString()
    @IsOptional()
    name?: string;
    
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    password: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(8, 10)
    idNumber: string;
  
    @IsString()
    @IsNotEmpty()
    city: string;
  
    @IsString()
    @IsNotEmpty()
    address: string;
  
    @IsString()
    @IsOptional()
    role?: string;
}
