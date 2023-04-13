import {Currency} from '../src/Currency';
import {Bank} from '../src/Bank';
import {MissingExchangeRateError} from '../src/MissingExchangeRateError';
import {Money} from "../src/Money";

class BankBuilder {
  static aBank = (): BankBuilder => new BankBuilder()
  private pivotCurrency: Currency = Currency.EUR;
  private exchangeRates: Map<Currency, number> = new Map<Currency, number>([
    [Currency.USD, 1.2]
  ]);

  public withPivotCurrency(currency: Currency): BankBuilder {
    this.pivotCurrency = currency;
    return this;
  }

  public withExchangeRate(to: Currency, rate: number): BankBuilder {
    this.exchangeRates.set(to, rate);
    return this;
  }

  public build(): Bank {
    let bank = new Bank;
    this.exchangeRates.forEach((rate: number, currency: Currency) => {
      bank.AddExchangeRate(this.pivotCurrency, currency, rate);
      bank.AddExchangeRate(currency, this.pivotCurrency, 1/rate);
    })
    return bank;
  }
}

describe('Bank', () => {

  let builder: BankBuilder = BankBuilder.aBank().withPivotCurrency(Currency.EUR);

  describe('Conversion', () => {
    test('should convert an amount from EUR to USD using the provided exchange rate', () => {
      const fromCurrency = Currency.EUR;
      const toCurrency = Currency.USD;
      const exchangeRate = 1.2;
      const amount = 10;

      const bank = builder.withExchangeRate(Currency.USD, 1.2).build()
      const result = bank.ConvertOld(amount, fromCurrency, toCurrency);

      expect(result).toBe(12);
    });

    test('should return the same value when converting an amount from USD to USD', () => {
      const money = new Money(10, Currency.USD)
      const fromCurrency = Currency.USD;
      const toCurrency = Currency.USD;
      const exchangeRate = 1;
      const amount = 10;

      const result = Bank.withExchangeRate(fromCurrency, toCurrency, exchangeRate).Convert(money, toCurrency);

      expect(result).toEqual(new Money(10, Currency.USD));
    });

    test('convert throws error in case of missing exchange rates', () => {
      expect(() => builder.withExchangeRate(Currency.USD, 1.2).build().Convert(new Money(10, Currency.EUR), Currency.KRW))
        .toThrow(MissingExchangeRateError)
    })

    test('should return different values when converting an amount using different exchange rates', () => {

      const fromCurrency = Currency.EUR;
      const toCurrency = Currency.USD;
      const amount = 10;
      const money = new Money(amount, fromCurrency)

      const result1 = builder.withExchangeRate(Currency.USD, 1.2).build().Convert(money, toCurrency);
      const result2 = builder.withExchangeRate(Currency.USD, 1.3).build().Convert(money, toCurrency);
      const result3 = builder.withExchangeRate(Currency.USD, 1.5).build().Convert(money, toCurrency);

      expect(result1).toEqual(new Money(12, Currency.USD));
      expect(result2).toEqual(new Money(13, Currency.USD));
      expect(result3).toEqual(new Money(15, Currency.USD));
    });
  });

});
