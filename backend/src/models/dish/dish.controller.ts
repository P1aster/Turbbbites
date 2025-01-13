import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishBodyDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Private } from '@/decorators/private.decorator';
import { Role } from '@/decorators/role.decorator';
import { UserRole } from '@/models/user/entities/user.entity';
import { Public } from '@/decorators/public.decorator';
import { FindAllDishesDto } from './dto/find-all-dishes.dto';
import { Multer } from '../../config/multer';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Private()
  @Role(UserRole.ADMIN)
  @Post()
  @UseInterceptors(Multer.dishImageInterceptor())
  create(
    @Body() body: CreateDishBodyDto,
    @UploadedFile(Multer.dishImageFilePipe())
    file: Express.Multer.File,
  ) {
    return this.dishService.createWithImageMultipartData(body, file);
  }

  // @Public()
  // @Get(':id/image')
  // getImage(@Param('id', ParseIntPipe) id: number) {
  //   return this.dishService.getDishImage(id);
  // }

  @Public()
  @Get()
  findAll(@Query() query: FindAllDishesDto) {
    return this.dishService.findAll(query);
  }

  @Private()
  @Role(UserRole.WORKER)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.dishService.findOne(id);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDishDto) {
    return this.dishService.update(id, body);
  }

  @Private()
  @Role(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.dishService.remove(id);
  }
}
