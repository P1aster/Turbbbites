import { CreateUserDto } from '@/models/user/dto/create-user.dto';
import { FindAllQueryDto } from '@/models/user/dto/findall-query.dto';
import { UpdateUserDto } from '@/models/user/dto/update-user.dto';
import { User, UserRole, UserStatus } from '@/models/user/entities/user.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
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
      console.info('Default admin user created.', headAdminUser);
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

  async findAll(
    params: FindAllQueryDto,
    userSession: UserSessionI,
  ): Promise<{ users: User[]; total: number }> {
    const { page, pageSize, restaurantId } = params;

    const { userId } = userSession;
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['restaurant'],
    });

    if (!user) {
      throw new NotFoundException({
        error: 'User not found',
        message: ['User not found'],
      });
    }

    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.restaurant', 'restaurant')
      .skip(page)
      .take(pageSize);

    // If restaurantId provided in query, use it
    if (restaurantId) {
      queryBuilder.where('restaurant.id = :restaurantId', { restaurantId });
    }
    // If session user has restaurant and no specific restaurantId requested
    else if (user.restaurant) {
      queryBuilder.where('restaurant.id = :restaurantId', {
        restaurantId: user.restaurant.id,
      });
    }
    // If no restaurant constraints, return all users (paginated)

    const [users, total] = await queryBuilder.getManyAndCount();

    return {
      users,
      total,
    };
  }
  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      select: ['id', 'fullname', 'email', 'role', 'status', 'restaurant'],
    });

    if (!user) {
      throw new NotFoundException({
        error: 'User not found',
        message: [`User with id "${id}" not found`],
      });
    }

    return user;
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async update(id: number, body: UpdateUserDto, userSession: UserSessionI) {
    const userToUpdate = await this.userRepository.findOne({
      where: { id },
    });

    if (!userToUpdate) {
      throw new NotFoundException({
        error: 'User not found',
        message: [`User with id "${id}" not found`],
      });
    } else if (userToUpdate.role >= userSession.role) {
      throw new UnauthorizedException({
        title: 'Unauthorized',
        message: [
          'You do not have the necessary permissions to perform this operation',
        ],
      });
    } else if (body.role && body.role >= userSession.role) {
      throw new UnauthorizedException({
        title: 'Unauthorized',
        message: [
          'You do not have the necessary permissions to perform this operation',
        ],
      });
    }
    return await this.userRepository.update({ id }, body);
  }

  async remove(id: number, userSession: UserSessionI) {
    const userToDelete = await this.userRepository.findOne({ where: { id } });

    if (!userToDelete) {
      throw new NotFoundException({
        error: 'User not found',
        message: [`User with id "${id}" not found`],
      });
    } else if (userToDelete.role >= userSession.role) {
      throw new UnauthorizedException({
        title: 'Unauthorized',
        message: [
          'You do not have the necessary permissions to perform this operation',
        ],
      });
    }

    await this.userRepository.delete({ id });
  }
}
