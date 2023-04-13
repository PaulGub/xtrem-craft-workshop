import {Currency} from '../src/Currency';
import {Bank} from '../src/Bank';

class ExchangeRate {
    public currency: Currency;
    public rate: number;
  
    constructor(currency: Currency, rate: number) {
        this.currency = currency;
        this.rate = rate;
    }
}

export class BankBuilder {
  static aBank = (): BankBuilder => new BankBuilder()
  private pivotCurrency: Currency = Currency.EUR;
  private exchangeRates: Map<Currency, ExchangeRate> = new Map<Currency, ExchangeRate>([
    [Currency.USD, new ExchangeRate(Currency.USD, 1.2)]
  ]);

  public withPivotCurrency(currency: Currency): BankBuilder {
    this.pivotCurrency = currency;
    return this;
  }

  public withExchangeRate(exchangeRate: ExchangeRate): BankBuilder {
    this.exchangeRates.set(exchangeRate.currency, exchangeRate);
    return this;
  }

  public build(): Bank {
    let bank = new Bank;
    this.exchangeRates.forEach((exchangeRate: ExchangeRate) => {
      bank.AddExchangeRate(this.pivotCurrency, exchangeRate.currency, exchangeRate.rate);
      bank.AddExchangeRate(exchangeRate.currency, this.pivotCurrency, 1/exchangeRate.rate);
    })
    return bank;
  }
}
