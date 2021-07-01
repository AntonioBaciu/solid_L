import { Discount } from "./Discount";

export class NoDiscount implements Discount {
  _value: number; // set empty value

  constructor() {
    this._value = 0; // in the constructor value = 0 because there is no discount
  }

  apply(price: number): number {
    return price;
  }

  showCalculation(price: number): string {
    return "No discount";
  }
}
