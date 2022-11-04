import { Body, Controller, HttpCode, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(200)
    @Post('login')
    async login(@Body() dto: LoginDto) {
        return await this.authService.login(dto);
    }
    
    @HttpCode(200)
    @Post('register')
    async register(@Body() dto: AuthDto) {        
        return await this.authService.register(dto);
    }

   
}
