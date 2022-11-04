import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { Prisma } from '@prisma/client';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { ConfigService } from '@nestjs/config/dist/config.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  //login buisness logic
  async login(dto: LoginDto) {
    //pull user from db
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new ForbiddenException('Invalid credentials - not exist');
    }
    //compare password
    const valid = await argon.verify(user.password, dto.password);
    if (!valid) {
      throw new ForbiddenException('Invalid credentials - wrong password');
    }

    delete user.password;
    return this.sign(user);
  }

  //rgistration buisness logic
  async register(dto: AuthDto) {    
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          //subscribe
          name: dto.name,
          email: dto.email,
          password: hash,
          idNumber: dto.idNumber,
          city: dto.city,
          address: dto.address,
        },
        select: {
          //returned data
          id: true,
          name: true,
          email: true,
          idNumber: true,
          city: true,
          address: true,
          role: true,
        },
      });
      return this.sign(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          // duplicate email
          throw new ForbiddenException('Email already exists');
        } else {
          throw new Error('Something went wrong: ' + error.message);
        }
      }
    }
  }
  //build token
  async sign(user: Object): Promise<{accessToken: string}> { //check if all works. if not change to any
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(user, { expiresIn: '1d', secret: secret });

    return {
      accessToken: token,
    }
  }
}

//basic token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOiIyMDIyLTEwLTA0VDE2OjE1OjI4LjA5MFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTEwLTA0VDE2OjE1OjI4LjEzM1oiLCJpZCI6MSwibmFtZSI6bnVsbCwiZW1haWwiOiJtaXNoYUBleGFtcGxlLmNvbSIsImlkTnVtYmVyIjoiMTAwMDAwMDAwIiwiY2l0eSI6ImhhaWZhIiwiYWRkcmVzcyI6Imtqd2ZoIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjQ5MDExNjgsImV4cCI6MTY2NDk4NzU2OH0.VHAk47SJKmTvvC0udgZPCqnkZvO6uspElrxkbDzwybg