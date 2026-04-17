import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { verifyToken } from 'src/common/utils/jwt.util';

@Injectable()
export class JwtAuthGuard implements CanActivate {

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    console.log('Incoming Request Headers:', request.headers);

    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);

    try {
      const decoded = verifyToken(token);
      console.log('Decoded Token:', decoded);
      request.user = decoded; // attach user
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
//-----------------------------------------------------
/* import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
 */