import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { Users } from '../models/auth.model';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
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
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    const user = await this.userService.create(createUserDto);
    return user;
  }
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne({ username, password });
    if (user) {
      const { password, ...result } = user;
      const ismatch = await bcrypt.compare(password, user.password);
      if (ismatch) {
        return result;
      }
    }
    return null;
  }
}
