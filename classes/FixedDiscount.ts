import { Discount } from "./Discount"; // Always import the interface, so it can be implemented in the class

// Inside the class, use the same PROPERTIES & METHODS from the interface. -> this applies for the next 2 classes too
// This class will only return the fixed discount [apply()] & return the calculated price [showCalculation()]
export class FixedDiscount implements Discount {
  _value: number;

  constructor(value: number) {
    this._value = value;
  }

  apply(price: number): number {
    return Math.max(0, price - this._value);
  }

  showCalculation(price: number): string {
    return price + "€ -  " + this._value + "€ (min 0 €)";
  }
}
