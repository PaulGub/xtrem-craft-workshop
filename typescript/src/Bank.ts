import {Currency} from './Currency'
import {MissingExchangeRateError} from './MissingExchangeRateError'
import {Money} from "./Money";

export class Bank {
  private readonly _exchangeRates: Map<string, number> = new Map()

  /**
   * @param currency1
   * @param currency2
   * @param rate
   */
  static withExchangeRate (currency1: Currency, currency2: Currency, rate: number): Bank {
    const bank = new Bank()
    bank.AddExchangeRate(currency1, currency2, rate)
    return bank
  }

  /**
   * @param currency1
   * @param currency2
   * @param rate
   */
  AddExchangeRate (currency1: Currency, currency2: Currency, rate: number): void {
    this._exchangeRates.set(currency1 + '->' + currency2, rate)
  }

  /**
   * @param amount
   * @param currency1
   * @param currency2
   */
  ConvertOld (amount: number, currency1: Currency, currency2: Currency): number {
    if (!(currency1 === currency2 || this._exchangeRates.has(currency1 + '->' + currency2))) { throw new MissingExchangeRateError(currency1, currency2) }

    return currency2 === currency1
        ? this.Convert(new Money(amount, currency1),currency2).amount
        : amount * this._exchangeRates.get(currency1 + '->' + currency2)
  }

  Convert(money: Money, toCurrency: Currency) :Money {
    if (!(money.currency === toCurrency || this._exchangeRates.has(money.currency + '->' + toCurrency))) { throw new MissingExchangeRateError(money.currency, toCurrency) }
    return money.currency !== toCurrency 
      ? new Money(money.amount*this._exchangeRates.get(money.currency + '->' + toCurrency),toCurrency)
      : money
  }
}
