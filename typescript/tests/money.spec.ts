import {Currency} from "../src/Currency";
import {Bank} from "../src/Bank";
import {MoneyCalculator} from "../src/MoneyCalculator";
import { throwError } from "fp-ts/lib/Option";

class Money {
    amount: number;
    currency: Currency;

    constructor(amount: number, currency: Currency) {
        this.amount = amount;
        this.currency = currency;
    }

    times(factor: number) {
        return new Money(this.amount * factor, this.currency);
    }
}

describe('Money TIMES', () => {
    test('should return a positive number when multiplying an amount in EUR by a factor', () => {
        const amount = 10;
        const factor = 2;
        const money = new Money(amount, Currency.EUR);

        const result = money.times(factor).amount;

        expect(result).toBe(20);
    });
});
