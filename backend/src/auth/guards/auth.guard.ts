import { IS_PRIVATE_KEY } from '@/decorators/private.decorator';
import { IS_PUBLIC_KEY } from '@/decorators/public.decorator';
import { ROLE_KEY } from '@/decorators/role.decorator';
import { UserRole } from '@/models/user/entities/user.entity';
import { UserService } from '@/models/user/user.service';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const _isPrivate = this.isPrivate(context);
    const _isPublic = this.isPublic(context);
    const roles = this.getRoles(context);

    if (!_isPrivate && !_isPublic) {
      throw new Error('Route is missing @Public() or @Private() decorator');
    }

    if (_isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException({
        title: 'Unauthorized',
        message: 'Token not found',
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.userService.findOne(payload.sub);
      request['user'] = { ...user, ...payload };

      if (!roles) {
        return true;
      }

      if (roles && !roles.some((role) => request['user'].role === role)) {
        throw new ForbiddenException({
          title: 'Forbidden',
          message: 'You do not have the necessary permissions',
        });
      }
      return true;
    } catch {
      throw new UnauthorizedException({
        title: 'Unauthorized',
        message: 'Invalid token',
      });
    }
  }

  private extractTokenFromHeader(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  private isPrivate(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(IS_PRIVATE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private isPublic(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private getRoles(context: ExecutionContext) {
    return this.reflector.getAllAndOverride<UserRole[]>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
