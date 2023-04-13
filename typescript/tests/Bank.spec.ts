import { Currency } from '../src/Currency';
import { Bank } from '../src/Bank';
import { MissingExchangeRateError } from '../src/MissingExchangeRateError';

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
      const result = bank.Convert(amount, fromCurrency, toCurrency);

      expect(result).toBe(12);
    });

    test('should return the same value when converting an amount from USD to USD', () => {
      const fromCurrency = Currency.USD;
      const toCurrency = Currency.USD;
      const exchangeRate = 1;
      const amount = 10;

      const bank = builder.withExchangeRate(Currency.USD, 1.2).build()
      const result = bank.Convert(amount, fromCurrency, toCurrency);

      expect(result).toBe(amount);
    });

    test('convert throws error in case of missing exchange rates', () => {
      expect(() => builder.withExchangeRate(Currency.USD, 1.2).build().Convert(10, Currency.EUR, Currency.KRW))
        .toThrow(MissingExchangeRateError)
    })

    test('should return different values when converting an amount using different exchange rates', () => {
      const fromCurrency = Currency.EUR;
      const toCurrency = Currency.USD;
      const amount = 10;

      const result1 = builder.withExchangeRate(Currency.USD, 1.2).build().Convert(amount, fromCurrency, toCurrency);
      const result2 = builder.withExchangeRate(Currency.USD, 1.3).build().Convert(amount, fromCurrency, toCurrency);
      const result3 = builder.withExchangeRate(Currency.USD, 1.5).build().Convert(amount, fromCurrency, toCurrency);

      expect(result1).toBe(12);
      expect(result2).toBe(13);
      expect(result3).toBe(15);
    });
  });

});
