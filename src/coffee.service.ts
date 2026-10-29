import { Injectable } from '@nestjs/common';

export interface Coffee {
  id: number;
  name: string;
  priceUsd: number;
}

@Injectable()
export class CoffeeService {
  private readonly menu: Coffee[] = [
    { id: 1, name: 'Espresso', priceUsd: 2.5 },
    { id: 2, name: 'Cappuccino', priceUsd: 3.5 },
    { id: 3, name: 'Latte', priceUsd: 4 },
  ];

  findAll(): Coffee[] {
    return this.menu;
  }
}
