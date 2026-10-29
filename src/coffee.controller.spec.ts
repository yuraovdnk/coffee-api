import { Test } from '@nestjs/testing';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';

describe('CoffeeController', () => {
  let controller: CoffeeController;
  let service: CoffeeService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CoffeeController],
      providers: [CoffeeService],
    }).compile();
    controller = moduleRef.get(CoffeeController);
    service = moduleRef.get(CoffeeService);
  });

  it('delegates to the service', () => {
    expect(controller.findAll().map((c) => c.name)).toEqual([
      'Espresso',
      'Cappuccino',
      'Latte1',
    ]);
  });

  it('returns exactly what the service returns', () => {
    const fake = [{ id: 99, name: 'Mock', priceUsd: 1 }];
    const spy = jest.spyOn(service, 'findAll').mockReturnValue(fake);
    expect(controller.findAll()).toBe(fake);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
