import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserSessionI } from 'types/userSession';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): UserSessionI | null => {
    const request = ctx.switchToHttp().getRequest();
    const user = request?.user;

    return data ? user?.[data] : user;
  },
);
