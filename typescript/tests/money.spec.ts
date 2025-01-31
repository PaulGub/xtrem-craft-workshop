import {Currency} from "../src/Currency";
import {Money} from "../src/Money";

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
describe('Money soustraction ok', () => {
    test('should return a positive number when multiplying an amount in EUR by a factor', () => {
        const money = new Money(10, Currency.EUR);
        const moneyBis = new Money(2, Currency.EUR);

        const result = money.soustraction(moneyBis);

        expect(result.amount).toBe(8);
    });
});


describe('Money addition pas ok', () => {
    test('should return a positive number when multiplying an amount in EUR by a factor', () => {
        const money = new Money(2, Currency.EUR);
        const moneyBis = new Money(10, Currency.USD);

        expect(() => { money.addition(moneyBis) }).toThrow(new Error(`Impossible to convert ${money.currency} into ${moneyBis.currency}`));
    });
});
describe('Money soustraction pas ok', () => {
    test('should return a positive number when multiplying an amount in EUR by a factor', () => {
        const money = new Money(10, Currency.EUR);
        const moneyBis = new Money(2, Currency.USD);

        expect(() => { money.soustraction(moneyBis) }).toThrow(new Error(`Impossible to convert ${money.currency} into ${moneyBis.currency}`));
    });
});