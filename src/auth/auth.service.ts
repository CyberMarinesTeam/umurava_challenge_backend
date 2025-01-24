import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Users } from './auth.model';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel('User') private userService: Model<Users>,
  ) {}
  login(user: any) {
    const payload = { usename: user.username, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async signup(createUserDto: CreateAuthDto) {
    const user = await this.userService.create(createUserDto);
  }
}
