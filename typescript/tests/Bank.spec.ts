import { Currency } from '../src/Currency';
import { Bank } from '../src/Bank';
import { MissingExchangeRateError } from '../src/MissingExchangeRateError';

describe('Bank', () => {

  describe('Conversion', () => {
    test('should convert an amount from EUR to USD using the provided exchange rate', () => {
      const fromCurrency = Currency.EUR;
      const toCurrency = Currency.USD;
      const exchangeRate = 1.2;
      const amount = 10;

      const result = Bank.withExchangeRate(fromCurrency, toCurrency, exchangeRate).Convert(amount, fromCurrency, toCurrency);

      expect(result).toBe(12);
    });

    test('should return the same value when converting an amount from USD to USD', () => {
      const fromCurrency = Currency.USD;
      const toCurrency = Currency.USD;
      const exchangeRate = 1;
      const amount = 10;

      const result = Bank.withExchangeRate(fromCurrency, toCurrency, exchangeRate).Convert(amount, fromCurrency, toCurrency);

      expect(result).toBe(amount);
    });

    test('convert throws error in case of missing exchange rates', () => {
      expect(() => Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2).Convert(10, Currency.EUR, Currency.KRW))
        .toThrow(MissingExchangeRateError)
    })

    test('should return different values when converting an amount using different exchange rates', () => {
      const fromCurrency = Currency.EUR;
      const toCurrency = Currency.USD;
      const amount = 10;

      const result1 = Bank.withExchangeRate(fromCurrency, toCurrency, 1.2).Convert(amount, fromCurrency, toCurrency);
      const result2 = Bank.withExchangeRate(fromCurrency, toCurrency, 1.3).Convert(amount, fromCurrency, toCurrency);
      const result3 = Bank.withExchangeRate(fromCurrency, toCurrency, 1.5).Convert(amount, fromCurrency, toCurrency);

      expect(result1).toBe(12);
      expect(result2).toBe(13);
      expect(result3).toBe(15);
    });
  });

});