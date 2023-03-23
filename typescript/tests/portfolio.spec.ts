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
  const bank = Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2)
  const bankKR = Bank.withExchangeRate(Currency.USD, Currency.KRW, 1100)

  test('5 USD + 10 EUR = 17 USD', () => {
    const portfolio = new Portfolio()
    portfolio.add(5, Currency.USD)
    portfolio.add(10, Currency.EUR)

    const result = portfolio.evaluate(Currency.USD, bank)

    expect(result).toBe(17)
  })

  test('1 USD + 1100 KRW = 2200 KRW', () => {
    const portfolio = new Portfolio()
    portfolio.add(1, Currency.USD)
    portfolio.add(1100, Currency.KRW)

    const result = portfolio.evaluate(Currency.KRW, bankKR)

    expect(result).toBe(2200)
  })

  it('should be evaluated to 0 when empty', () => {
    const portfolio = new Portfolio()
    const result = portfolio.evaluate(Currency.USD, bankKR)

    expect(result).toBe(0)
  })

  it('', () => {
    const portfolio = new Portfolio()
    portfolio.add(5, Currency.USD)

    const result = portfolio.evaluate(Currency.USD, bank)

    expect(result).toBe(5)
  })
})
