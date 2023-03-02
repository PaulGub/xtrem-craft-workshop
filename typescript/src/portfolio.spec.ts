import { Bank } from "./Bank";
import { Currency } from "./Currency";

class Portfolio { 
    add(number: number, EUR: Currency) { } 
    evaluate(USD: Currency, bank: Bank) { }

}


describe('Portfolios', () => { 
    test('5 USD + 10 EUR = 17 USD', () => {
        const portfolio = new Portfolio();
        portfolio.add(5, Currency.USD);
        portfolio.add(10, Currency.EUR);

        const result = portfolio.evaluate(Currency.USD, Bank.withExchangeRate(Currency.EUR, Currency.USD, 1.2));

        expect(result).toBe(17);
        
    })
})