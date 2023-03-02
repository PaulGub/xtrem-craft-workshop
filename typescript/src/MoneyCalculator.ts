import { Currency } from './Currency'

export class MoneyCalculator {
  private static checkNumberSign (num1: number, num2: number): boolean {
    return Math.sign(num1) !== -1 && Math.sign(num2) !== -1
  }
  static Add (amount: number, currency: Currency, amount2: number): number|null {
    return this.checkNumberSign(amount, amount2) ? amount + amount2 : null
  }
  static Times (amount: number, currency: Currency, number: number): number|null {
    return this.checkNumberSign(amount, number) ? amount * number : null
  }
  static Divide (amount: number, currency: Currency, value: number): number|null {
    return this.checkNumberSign(amount, value) ? amount / value : null
  }
}