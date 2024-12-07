import { CreateUserDto } from '@/models/user/dto/create-user.dto';
import { UpdateUserDto } from '@/models/user/dto/update-user.dto';
import { User, UserRole, UserStatus } from '@/models/user/entities/user.entity';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSessionI } from 'types/userSession';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const existingHeadAdmin = await this.userRepository.findOne({
      where: { email: 'root@root.com' },
    });

    if (!existingHeadAdmin) {
      const headAdminUser = this.userRepository.create({
        fullname: 'root',
        role: UserRole.HEAD_ADMIN,
        status: UserStatus.ACTIVE,
        email: 'root@root.com',
        password: 'Password6182',
      });

      await this.userRepository.save(headAdminUser);
      console.info('Default admin user created.');
    }
  }

  async create(body: CreateUserDto, userSession: UserSessionI | null) {
    const { email, role } = body;
    const exists = await this.userRepository.findOne({
      where: { email: email },
    });

    if (exists) {
      throw new ConflictException({
        error: 'User already exists',
        message: [`User with email "${email}" already exists`],
      });
    }

    if (userSession !== null && role && userSession.role <= role) {
      throw new UnauthorizedException({
        error: 'Insufficient permissions for this operation',
        message: [
          `You need to be at least a "${role}" to perform this operation`,
        ],
      });
    } else if (role && role > UserRole.CLIENT) {
      throw new UnauthorizedException({
        error: 'Operation requires authentication',
        message: ['You need to be authenticated to perform this operation'],
      });
    }

    const userEntity = await this.userRepository.create(body);
    await this.userRepository.save(userEntity);
    const { password: _, ...user } = userEntity;
    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id: id } });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
