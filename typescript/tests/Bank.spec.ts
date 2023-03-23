import {Currency} from '../src/Currency';
import {Bank} from '../src/Bank';
import {MissingExchangeRateError} from '../src/MissingExchangeRateError';
import {Money} from "../src/Money";

describe('Bank', () => {

  describe('Conversion', () => {
    test('should convert an amount from EUR to USD using the provided exchange rate', () => {
      const fromCurrency = Currency.EUR;
      const toCurrency = Currency.USD;
      const exchangeRate = 1.2;
      const amount = 10;

      const result = Bank.withExchangeRate(fromCurrency, toCurrency, exchangeRate).ConvertOld(amount, fromCurrency, toCurrency);

      expect(result).toBe(12);
    });

    test('should return the same value when converting an amount from USD to USD', () => {
      const fromCurrency = Currency.USD;
      const toCurrency = Currency.USD;
      const exchangeRate = 1;
      const amount = 10;

      const result = Bank.withExchangeRate(fromCurrency, toCurrency, exchangeRate).ConvertOld(amount, fromCurrency, toCurrency);

      expect(result).toBe(amount);
    });

    test('should return the same value when converting an amount from USD to USD', () => {
      const money = new Money(10, Currency.USD)
      const fromCurrency = Currency.USD;
      const toCurrency = Currency.USD;
      const exchangeRate = 1;
      const amount = 10;

      const result = Bank.withExchangeRate(fromCurrency, toCurrency, exchangeRate).Convert(money,toCurrency);

      expect(result).toEqual(new Money(10, Currency.USD));
    });

    test('convert throws error in case of missing exchange rates', () => {
      expect(() => Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2).ConvertOld(10, Currency.EUR, Currency.KRW))
        .toThrow(MissingExchangeRateError)
    })

    test('should return different values when converting an amount using different exchange rates', () => {
      const fromCurrency = Currency.EUR;
      const toCurrency = Currency.USD;
      const amount = 10;

      const result1 = Bank.withExchangeRate(fromCurrency, toCurrency, 1.2).ConvertOld(amount, fromCurrency, toCurrency);
      const result2 = Bank.withExchangeRate(fromCurrency, toCurrency, 1.3).ConvertOld(amount, fromCurrency, toCurrency);
      const result3 = Bank.withExchangeRate(fromCurrency, toCurrency, 1.5).ConvertOld(amount, fromCurrency, toCurrency);

      expect(result1).toBe(12);
      expect(result2).toBe(13);
      expect(result3).toBe(15);
    });

    test('should return different values when converting an amount using different exchange rates', () => {

      const money = new Money(10, Currency.EUR)
      const fromCurrency = Currency.EUR;
      const toCurrency = Currency.USD;
      const amount = 10;

      const result1 = Bank.withExchangeRate(fromCurrency, toCurrency, 1.2).Convert(money, toCurrency);
      const result2 = Bank.withExchangeRate(fromCurrency, toCurrency, 1.3).Convert(money, toCurrency);
      const result3 = Bank.withExchangeRate(fromCurrency, toCurrency, 1.5).Convert(money, toCurrency);

      expect(result1).toEqual(new Money(12, Currency.USD));
      expect(result2).toEqual(new Money(13, Currency.USD));
      expect(result3).toEqual(new Money(15, Currency.USD));
    });
  });

});
