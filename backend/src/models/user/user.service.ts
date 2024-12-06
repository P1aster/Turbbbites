import { CreateUserDto } from '@/models/user/dto/create-user.dto';
import { UpdateUserDto } from '@/models/user/dto/update-user.dto';
import { User, UserRole, UserStatus } from '@/models/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    const existingAdmin = await this.userRepository.findOne({
      where: { email: 'root@root.com' },
    });

    if (!existingAdmin) {
      const adminUser = this.userRepository.create({
        fullname: 'root',
        role: UserRole.ADMIN,
        status: UserStatus.ACTIVE,
        email: 'root@root.com',
        password: '6182',
      });

      await this.userRepository.save(adminUser);
      console.info('Default admin user created.');
    }
  }

  create(body: CreateUserDto) {
    return this.userRepository.save(body);
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
