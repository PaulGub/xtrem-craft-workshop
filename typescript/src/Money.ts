import {Currency} from "./Currency";

export class Money {
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
        if (monney.currency === this.currency) {
            return new Money(this.amount + monney.amount, this.currency);
        } else {
            throw new Error(`Impossible to convert ${this.currency} into ${monney.currency}`);
        }
    }

    soustraction(monney: Money) {
        if (monney.currency === this.currency) {
            return new Money(this.amount - monney.amount, this.currency);
        } else {
            throw new Error(`Impossible to convert ${this.currency} into ${monney.currency}`);
        }
    }

}