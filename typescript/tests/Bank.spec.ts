import {Currency} from '../src/Currency';
import {Bank} from '../src/Bank';
import {MissingExchangeRateError} from '../src/MissingExchangeRateError';
import {Money} from "../src/Money";
import {BankBuilder} from "../src/BankBuilder";

class ExchangeRate {
  public currency: Currency;
  public rate: number;

  constructor(currency: Currency, rate: number) {
    this.currency = currency;
    this.rate = rate;
  }
}

describe('Bank', () => {

  let builder: BankBuilder = BankBuilder.aBank().withPivotCurrency(Currency.EUR);
  let exchangeRate: ExchangeRate = new ExchangeRate(Currency.USD, 1.2);

  describe('Conversion', () => {
    test('should convert an amount from EUR to USD using the provided exchange rate', () => {
      const fromCurrency = Currency.EUR;
      const toCurrency = Currency.USD;
      const amount = 10;
      const money = new Money(amount, fromCurrency)

      const bank = builder.withExchangeRate(exchangeRate).build();
      const result = bank.Convert(money, toCurrency);

      expect(result).toBe(12);
    });

    test('should return the same value when converting an amount from USD to USD', () => {
      const fromCurrency = Currency.USD;
      const toCurrency = Currency.USD;
      const amount = 10;
      const money = new Money(amount, fromCurrency)

      const bank = builder.withExchangeRate(exchangeRate).build();
      const result = bank.Convert(money, toCurrency);

      expect(result).toEqual(new Money(10, Currency.USD));
    });

    test('convert throws error in case of missing exchange rates', () => {
      expect(() => builder.withExchangeRate(exchangeRate).build().Convert(new Money(10, Currency.EUR), Currency.KRW))
        .toThrow(MissingExchangeRateError)
    })

    test('should return different values when converting an amount using different exchange rates', () => {

      const fromCurrency = Currency.EUR;
      const toCurrency = Currency.USD;
      const amount = 10;
      const money = new Money(amount, fromCurrency);

      const exchangeRate1 = new ExchangeRate(toCurrency, 1.2);
      const exchangeRate2 = new ExchangeRate(toCurrency, 1.3);
      const exchangeRate3 = new ExchangeRate(toCurrency, 1.5);

      const result1 = builder.withExchangeRate(exchangeRate1).build().Convert(money, toCurrency);
      const result2 = builder.withExchangeRate(exchangeRate2).build().Convert(money, toCurrency);
      const result3 = builder.withExchangeRate(exchangeRate3).build().Convert(money, toCurrency);

      expect(result1).toEqual(new Money(12, Currency.USD));
      expect(result2).toEqual(new Money(13, Currency.USD));
      expect(result3).toEqual(new Money(15, Currency.USD));
    });
  });

});
