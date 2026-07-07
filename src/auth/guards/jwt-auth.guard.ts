import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user?: any;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = await super.canActivate(context);
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    if (request.user && typeof request.user === 'object') {
      return true;
    }

    throw new UnauthorizedException('Invalid or missing token');
  }

  handleRequest<TUser = any>(err: any, user: TUser, _info: any): TUser {
    if (err || !user) {
      throw err ?? new UnauthorizedException('Invalid or missing token');
    }

    return user;
  }
}
