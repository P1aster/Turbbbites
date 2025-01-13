import { User } from '@/models/user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserStatus } from '../models/user/entities/user.entity';
import { UserService } from '../models/user/user.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth-dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validToken(token?: string) {
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    console.log('PAYLOAD', payload, token);
    if (payload) {
      return true;
    }
    return false;
  }

  async login(data: LoginAuthDto) {
    const { email, password } = data;
    if (!email || !password) {
      throw new UnauthorizedException({
        error: 'Invalid credentials',
        message: 'Email and password are required',
      });
    }

    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException({
        error: 'Invalid credentials',
        message: 'Email or password is incorrect',
      });
    }

    if (user.status === UserStatus.INACTIVE) {
      throw new UnauthorizedException({
        error: 'Invalid credentials',
        message: 'User is inactive',
      });
    }

    return await this.signinUser(user);
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

  async register(data: RegisterAuthDto) {
    const { email } = data;

    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new UnauthorizedException({
        error: 'User already exists',
        message: `User with email "${email}" already exists`,
      });
    }

    const res = await this.userService.create(data, null);
    if (!res) {
      throw new UnauthorizedException({
        error: 'User not created',
        message: 'User not created',
      });
    }

    const token = await this.jwtService.signAsync({
      userId: res.id,
      role: res.role,
    });

    return { token, ...res };
  }
}
