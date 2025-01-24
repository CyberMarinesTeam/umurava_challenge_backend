import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';
import { UnauthorizedException } from '@nestjs/common';
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  async validate(username: string, password: string): Promise<any> {
    const user = this.authService.validateUser(username, password);
    if (!user) {
      return new UnauthorizedException();
    }
    return user;
  }
}
