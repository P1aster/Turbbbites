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
      return new UnauthorizedException({
        title: 'Invalid credentials',
        message: 'Email and password are required',
      });
    }

    const user = await this.validateUser(email, password);
    if (!user) {
      return new UnauthorizedException({
        title: 'Invalid credentials',
        message: 'Email or password is incorrect',
      });
    }

    if (user.status === UserStatus.INACTIVE) {
      return new UnauthorizedException({
        title: 'Invalid credentials',
        message: 'User is inactive',
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
    const payload = { sub: user.id, email: user.email };
    const token = await this.jwtService.signAsync(payload);
    return { token, ...user };
  }
}
