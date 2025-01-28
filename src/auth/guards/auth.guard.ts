import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('AuthGuard executed');
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      console.log('Authorization header missing');
      throw new UnauthorizedException('Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.log('Token missing');
      throw new UnauthorizedException('Token missing');
    }

    console.log('Token found:', token);

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      console.log('Payload:', payload);

      // Attach user payload to the request object
      request['user'] = payload;
      console.log('User attached to request:', request['user']);
    } catch (error) {
      console.log('JWT verification failed:', error.message);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }
}
