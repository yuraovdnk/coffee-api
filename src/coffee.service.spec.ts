import { CoffeeService } from './coffee.service';

describe('CoffeeService', () => {
  const service = new CoffeeService();

  it('returns the coffee menu', () => {
    const items = service.findAll();
    expect(items).toHaveLength(3);
    expect(items[0]).toEqual({ id: 1, name: 'Espresso', priceUsd: 2.5 });
  });

  it('has unique ids', () => {
    const ids = service.findAll().map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has positive prices and non-empty names', () => {
    for (const c of service.findAll()) {
      expect(c.priceUsd).toBeGreaterThan(0);
      expect(c.name.trim()).not.toBe('');
    }
  });
});
