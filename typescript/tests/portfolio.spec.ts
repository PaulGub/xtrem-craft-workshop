import { empty } from 'fp-ts/lib/ReadonlyRecord'
import { experiment } from 'fp-ts/lib/Store'
import { Bank } from '../src/Bank'
import { Currency } from '../src/Currency'

class Portfolio {
  private count: { amount: number; currency: Currency }[] = []

  add(amount: number, currency: Currency) {
    this.count.push({ amount: amount, currency: currency })
  }
  evaluate(to: Currency, bank: Bank) {
    return this.count.reduce(
      (acc: number, cur: { amount: number; currency: Currency }): number => {
        return acc + bank.Convert(cur.amount, cur.currency, to)
      },
      0
    )
  }
}

describe('Portfolios', () => {
  const bankEURtoUSD = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
  const bankUSDtoKR = Bank.withExchangeRate(Currency.USD, Currency.KRW, 1100)
  const bankUSDtoEUR = Bank.withExchangeRate(Currency.USD, Currency.EUR, 0.82)
  const bankEURtoKR = Bank.withExchangeRate(Currency.EUR, Currency.KRW, 1344)

  test('5 USD + 10 EUR = 17 USD', () => {
    const portfolio = new Portfolio()
    portfolio.add(5, Currency.USD)
    portfolio.add(10, Currency.EUR)

    const result = portfolio.evaluate(Currency.USD, bankEURtoUSD)

    expect(result).toBe(17)
  })

  test('1 USD + 1100 KRW = 2200 KRW', () => {
    const portfolio = new Portfolio()
    portfolio.add(1, Currency.USD)
    portfolio.add(1100, Currency.KRW)

    const result = portfolio.evaluate(Currency.KRW, bankUSDtoKR)

    expect(result).toBe(2200)
  })

  test('5 USD + 10 EUR = 14.1 EUR', () => {
    const portfolio = new Portfolio()
    portfolio.add(5, Currency.USD)
    portfolio.add(10, Currency.EUR)

    const result = portfolio.evaluate(Currency.EUR, bankUSDtoEUR)

    expect(result).toBe(14.1)
  })

  test('5 USD + 10 EUR = 18940 KRW', () => {
    const portfolio = new Portfolio()
    portfolio.add(5, Currency.USD)
    const result = portfolio.evaluate(Currency.KRW, bankUSDtoKR)

    const portfolio2 = new Portfolio();
    portfolio2.add(10, Currency.EUR)
    const result2 = portfolio2.evaluate(Currency.KRW, bankEURtoKR)

    expect(result + result2).toBe(18940)
  })

  it('should be evaluated to 0 when empty', () => {
    const portfolio = new Portfolio()
    const result = portfolio.evaluate(Currency.USD, bankUSDtoKR)

    expect(result).toBe(0)
  })

  it('', () => {
    const portfolio = new Portfolio()
    portfolio.add(5, Currency.USD)

    const result = portfolio.evaluate(Currency.USD, bankEURtoUSD)

    expect(result).toBe(5)
  })
})
