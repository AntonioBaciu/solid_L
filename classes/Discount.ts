// Discount interface:
export interface Discount {
  _value: number;

  apply(price: number): number;
  showCalculation(price: number): string;
}

// The interface above will be implemented in the rest of the classes.
// Instead of using a [Discount TYPE] and many if/else statements,
// I will use an interface that will be implemented by the new classes.
