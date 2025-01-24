import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { UpdateAuthDto } from '../dto/update-auth.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { ApiBody, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthEntity } from '../entities/auth.entity';
import { LoginBodyDto, LoginResponseDto } from '../dto/response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @ApiCreatedResponse({ type: LoginResponseDto })
  @ApiBody({ type: LoginBodyDto })
  @Post('login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }
  @ApiBody({ type: AuthEntity })
  @ApiCreatedResponse({ type: AuthEntity })
  @Post('signup')
  signup(@Body() createUserDto: CreateAuthDto) {
    return this.authService.signup(createUserDto);
  }
}
