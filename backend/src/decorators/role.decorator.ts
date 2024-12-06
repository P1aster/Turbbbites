import { UserRole } from '@/models/user/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';
export const Role = (...roles: UserRole[]) => SetMetadata(ROLE_KEY, roles);
