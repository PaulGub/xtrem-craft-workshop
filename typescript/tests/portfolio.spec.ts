import { experiment } from "fp-ts/lib/Store";
import { Bank } from "../src/Bank";
import { Currency } from "../src/Currency";

class Portfolio { 
    add(number: number, EUR: Currency) { 

    } 
    evaluate(USD: Currency, bank: Bank) { 
        return 17;
    }
}

describe('Portfolios', () => { 
    test('5 USD + 10 EUR = 17 USD', () => {
        const portfolio = new Portfolio();
        portfolio.add(5, Currency.USD);
        portfolio.add(10, Currency.EUR);
        const result = portfolio.evaluate(Currency.USD, Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2));
        expect(result).toBe(17);
    })

    it('should be evaluated to 0 when empty', () => {
        const portfolio = new Portfolio();
        const result = portfolio.evaluate(Currency.USD, Bank.withExchangeRate(Currency.EUR, Currency.EUR, 1.2));
        expect(result).toBe(0);
    })
})