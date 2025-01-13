import { Controller } from '@nestjs/common';
import { DishIngredientsService } from './dish-ingredients.service';

@Controller('dishIngredients')
export class DishIngredientsController {
  constructor(
    private readonly dishIngredientsService: DishIngredientsService,
  ) {}
}
