import { User } from '@/models/user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '../models/user/entities/user.entity';
import { UserService } from '../models/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginAuthDto) {
    const { email, password } = data;
    if (!email || !password) {
      throw new UnauthorizedException({
        error: 'Invalid credentials',
        message: ['Email and password are required'],
      });
    }

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException({
        error: 'Invalid credentials',
        message: ['Email or password is incorrect'],
      });
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedException({
        error: 'Invalid credentials',
        message: ['User is inactive'],
      });
    }

    return this.signinUser(user);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) {
      const { password: _, ...result } = user;
      return result as User;
    }
    return null;
  }

  async signinUser(user: User) {
    const token = await this.jwtService.signAsync({
      userId: user.id,
      role: user.role,
    });
    return { token, ...user };
  }
}
