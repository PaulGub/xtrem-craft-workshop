import { Currency } from '../src/Currency';
import { MoneyCalculator } from '../src/MoneyCalculator';

describe('MoneyCalculator', () => {

  describe('Addition', () => {
    test('should return a number when adding two amounts in USD', () => {
      const amount1 = 5;
      const amount2 = 10;
      const currency = Currency.USD;

      const result = MoneyCalculator.Add(amount1, currency, amount2);

      expect(typeof result).toBe('number');
    });

    test('should not return null when adding two amounts in USD', () => {
      const amount1 = 5;
      const amount2 = 10;
      const currency = Currency.USD;

      const result = MoneyCalculator.Add(amount1, currency, amount2);

      expect(result).not.toBeNull();
    });
  });

  describe('Multiplication', () => {
    test('should return a positive number when multiplying an amount in EUR by a factor', () => {
      const amount = 10;
      const factor = 2;
      const currency = Currency.EUR;

      const result = MoneyCalculator.Times(amount, currency, factor);

      expect(result).toBeGreaterThan(0);
    });
  });

  describe('Division', () => {
    test('should return a number when dividing an amount in KRW by a divisor', () => {
      const amount = 4002;
      const divisor = 4;
      const currency = Currency.KRW;

      const result = MoneyCalculator.Divide(amount, currency, divisor);

      expect(typeof result).toBe('number');
    });

    test('should return the correct quotient when dividing an amount in KRW by a divisor', () => {
      const amount = 4002;
      const divisor = 4;
      const currency = Currency.KRW;

      const result = MoneyCalculator.Divide(amount, currency, divisor);

      expect(result).toBeCloseTo(1000.5, 4);
    });
  });
  
});
