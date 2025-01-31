import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { AuthModule } from '@/auth/auth.module';
import { AuthGuard } from '@/auth/guards/auth.guard';
import config from '@/config/app.config';
import database from '@/config/database.config';
import { BusinessHoursModule } from '@/models/business-hours/business-hours.module';
import { DishCategoryModule } from '@/models/dish-category/dish-category.module';
import { DishIngredientsModule } from '@/models/dish-ingredients/dish-ingredients.module';
import { DishModule } from '@/models/dish/dish.module';
import { OrderItemsModule } from '@/models/order-items/order-items.module';
import { OrderModule } from '@/models/order/order.module';
import { ProductCategoryModule } from '@/models/product-category/product-category.module';
import { ProductModule } from '@/models/product/product.module';
import { RestaurantStockModule } from '@/models/restaurant-stock/restaurant-stock.module';
import { RestaurantModule } from '@/models/restaurant/restaurant.module';
import { SpecialHoursModule } from '@/models/special-hours/special-hours.module';
import { UserModule } from '@/models/user/user.module';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { JwtAuthMiddleware } from './middleware/auth.middleware';

@Module({
  imports: [
    config,
    database,
    AuthModule,
    UserModule,
    BusinessHoursModule,
    SpecialHoursModule,
    RestaurantModule,
    OrderModule,
    OrderItemsModule,
    DishModule,
    DishCategoryModule,
    DishIngredientsModule,
    ProductModule,
    ProductCategoryModule,
    RestaurantStockModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtAuthMiddleware).forRoutes('*');
  }
}
