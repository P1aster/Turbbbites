import { Private } from '@/decorators/private.decorator';
import { Public } from '@/decorators/public.decorator';
import { Role } from '@/decorators/role.decorator';
import { User } from '@/decorators/user.decorator';
import { FindAllQueryDto } from '@/models/user/dto/findall-query.dto';
import { UserRole } from '@/models/user/entities/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  create(@Body(new ValidationPipe()) body: CreateUserDto, @User() user) {
    return this.userService.create(body, user);
  }

  @Private()
  @Role(UserRole.MANAGER)
  @Get()
  findAll(
    @Query(new ValidationPipe({ transform: true })) params: FindAllQueryDto,
    @User() user,
  ) {
    return this.userService.findAll(params, user);
  }

  @Private()
  @Role(UserRole.MANAGER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Private()
  @Role(UserRole.MANAGER)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) body: UpdateUserDto,
    @User() user,
  ) {
    return this.userService.update(id, body, user);
  }

  @Private()
  @Role(UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @User() user) {
    return this.userService.remove(id, user);
  }
}
