import { Controller, Get } from '@nestjs/common';
import { Coffee, CoffeeService } from './coffee.service';

@Controller('coffees')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  findAll(): Coffee[] {
    return this.coffeeService.findAll();
  }
}
