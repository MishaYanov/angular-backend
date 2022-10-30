import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  //this contoller is for test purpose only signin first to get token
  @UseGuards(JwtGuard)
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
