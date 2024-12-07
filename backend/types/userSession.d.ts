import { UserRole } from '@/models/user/entities/user.entity';

declare interface UserI {
  userId: number;
  role: UserRole;
}

declare interface UserSessionI extends UserI {
  iat: number;
  exp: number;
}
export { UserSessionI };
