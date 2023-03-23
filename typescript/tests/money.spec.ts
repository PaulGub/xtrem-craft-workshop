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

    addition(monney: Money) {
        if(monney.currency === this.currency ){
            return new Money(this.amount + monney.amount, this.currency);
        }else{
            throw new Error(`Impossible to convert ${this.currency} into ${monney.currency}`);
        }
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

describe('Money addition ok', () => {
    test('should return a positive number when multiplying an amount in EUR by a factor', () => {
        const money = new Money(2, Currency.EUR);
        const moneyBis = new Money(10, Currency.EUR);

        const result = money.addition(moneyBis);

        expect(result.amount).toBe(12);
    });
});


describe('Money addition  pas ok', () => {
    test('should return a positive number when multiplying an amount in EUR by a factor', () => {
        const money = new Money(2, Currency.EUR);
        const moneyBis = new Money(10, Currency.USD);

        expect(() => { money.addition(moneyBis) }).toThrow(new Error(`Impossible to convert ${money.currency} into ${moneyBis.currency}`));
    });
});