import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users } from '../models/auth.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userService: Model<Users>) {}
  async getUser(id: string) {
    const user = await this.userService.findById(id);
    if (user) {
      return user;
    } else {
      return new NotFoundException('user not found');
    }
  }
  async getUsers() {
    const users = await this.userService.find();
    if (users) {
      return users;
    } else {
      return new NotFoundException('no users found');
    }
  }
}
