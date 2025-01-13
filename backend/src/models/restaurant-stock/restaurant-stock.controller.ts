import { Body, Controller, Post } from '@nestjs/common';
import { RestaurantStockService } from './restaurant-stock.service';
import { AppRestaurantStockDto } from './dto/add-restaurant-stock.dto';
import { Private } from '@/decorators/private.decorator';
import { Role } from '@/decorators/role.decorator';
import { UserRole } from '@/models/user/entities/user.entity';

@Controller('restaurantStock')
export class RestaurantStockController {
  constructor(
    private readonly restaurantStockService: RestaurantStockService,
  ) {}

  @Private()
  @Role(UserRole.MANAGER)
  @Post()
  addProduct(@Body() body: AppRestaurantStockDto) {
    return this.restaurantStockService.addStockItem(body);
  }
}
