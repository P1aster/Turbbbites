import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UserSessionI } from 'types/userSession';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      return next();
    }

    try {
      const payload = await this.jwtService.verifyAsync<UserSessionI>(token, {
        secret: process.env.JWT_SECRET,
      });
      req['user'] = payload;
    } catch {
      req['user'] = null;
    } finally {
      next();
    }
  }
  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
