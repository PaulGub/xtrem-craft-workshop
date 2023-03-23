import { empty } from 'fp-ts/lib/ReadonlyRecord'
import { experiment } from 'fp-ts/lib/Store'
import { Bank } from '../src/Bank'
import { Currency } from '../src/Currency'
import { Money } from '../src/Money'

class Portfolio {
  private count: Money[] = []

  add(money : Money) {
    this.count.push(money)
  }
  evaluate(to: Currency, bank: Bank) : Money {
    return this.count.reduce(
      (acc: Money, cur: Money): Money => {
        return acc.addition(bank.Convert(cur, to))
      }, new Money(0, to)
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

    portfolio.add(new Money(5, Currency.USD));
    portfolio.add(new Money(10, Currency.EUR));

    const result = portfolio.evaluate(Currency.USD, bankEURtoUSD)

    expect(result).toStrictEqual(new Money(17,Currency.USD))
  })

  test('1 USD + 1100 KRW = 2200 KRW', () => {
    const portfolio = new Portfolio()
    portfolio.add(new Money(1, Currency.EUR))
    portfolio.add(new Money(1100, Currency.KRW))

    const result = portfolio.evaluate(Currency.KRW, bankUSDtoKR)

    expect(result).toStrictEqual(new Money(2200, Currency.KRW))
  })

  test('5 USD + 10 EUR = 14.1 EUR', () => {
    const portfolio = new Portfolio()
    portfolio.add(new Money(5, Currency.USD))
    portfolio.add(new Money(10, Currency.EUR))

    const result = portfolio.evaluate(Currency.EUR, bankUSDtoEUR)

    expect(result).toStrictEqual(new Money(14.1, Currency.EUR))
  })

  test('5 USD + 10 EUR = 18940 KRW', () => {
    const portfolio = new Portfolio()
    portfolio.add(new Money(5, Currency.USD))
    portfolio.add(new Money(10, Currency.EUR))
    const result2 = portfolio.evaluate(Currency.KRW, bankEURtoKR)

    expect(result2).toStrictEqual(new Money(18940, Currency.KRW))
  })

  it('should be evaluated to 0 when empty', () => {
    const portfolio = new Portfolio()
    const result = portfolio.evaluate(Currency.USD, bankUSDtoKR)

    expect(result).toStrictEqual(new Money(0,Currency.USD))
  })
})
