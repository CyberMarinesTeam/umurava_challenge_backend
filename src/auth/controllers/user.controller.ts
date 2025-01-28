import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthEntity } from '../entities/auth.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @ApiOkResponse({ type: AuthEntity })
  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUser(id);
    return user;
  }
  @ApiOkResponse({ type: AuthEntity, isArray: true })
  @Get('users')
  async getUsers() {
    return this.userService.getUsers();
  }
}
