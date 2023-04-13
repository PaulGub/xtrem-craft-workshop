import {Currency} from '../src/Currency';
import {Bank} from '../src/Bank';

export class BankBuilder {
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
