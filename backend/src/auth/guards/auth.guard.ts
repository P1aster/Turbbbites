import { IS_PRIVATE_KEY } from '@/decorators/private.decorator';
import { IS_PUBLIC_KEY } from '@/decorators/public.decorator';
import { ROLE_KEY } from '@/decorators/role.decorator';
import { UserRole } from '@/models/user/entities/user.entity';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserSessionI } from 'types/userSession';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const _isPrivate = this.isPrivate(context);
    const _isPublic = this.isPublic(context);
    const role = this.getRole(context);

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
        error: 'Unauthorized',
        message: ['Token not found'],
      });
    }

    if (!role) {
      return true;
    }

    try {
      const payload = await this.jwtService.verifyAsync<UserSessionI>(token, {
        secret: process.env.JWT_SECRET,
      });

      if (!this.isRoleHigher(payload.role, role)) {
        throw new ForbiddenException({
          error: 'Forbidden',
          message: ['You do not have the necessary permissions'],
        });
      }

      return true;
    } catch {
      throw new UnauthorizedException({
        error: 'Unauthorized',
        message: ['Invalid token'],
      });
    }
  }

  private isRoleHigher(role: number, requiredRole: number) {
    return role >= requiredRole;
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

  private getRole(context: ExecutionContext): UserRole | null {
    return this.reflector.getAllAndOverride<UserRole>(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }
}
