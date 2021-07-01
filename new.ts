import { Discount } from "./classes/Discount";
import { FixedDiscount } from "./classes/FixedDiscount";
import { NoDiscount } from "./classes/NoDiscount";
import { VariableDiscount } from "./classes/VariableDIscount";

class Product {
  private _name: string;
  private _price: number;
  private _discount: Discount;

  constructor(name: string, price: number, discount: Discount) {
    this._name = name;
    this._price = price;
    this._discount = discount;
  }

  get name(): string {
    return this._name;
  }

  get discount(): Discount {
    return this._discount;
  }

  get originalPrice(): number {
    return this._price;
  }

  //The reason we call this function "calculateX" instead of using a getter on Price is because names communicate a lot of meaning between programmers.
  //most programmers would assume a getPrice() would be a simple display of a property that is already calculated, but in fact this function does a (more expensive) operation to calculate on the fly.
  calculatePrice(): number {
    return this._discount.apply(this._price);
  }

  showCalculation(): string {
    return this._discount.showCalculation(this._price);
  }
}

class shoppingBasket {
  //this array only accepts Product objects, nothing else
  private _products: Product[] = [];

  get products(): Product[] {
    return this._products;
  }

  addProduct(product: Product) {
    this._products.push(product);
  }
}

// The new object was created in relation with the Discount class.
// Since I have a Discount interface that is implemented in the rest of the classes ( fix, no, variable DISCOUNT)
// I used the constructor of those classes to create a new FixedDiscount(10), VariableDiscount(25) & NoDiscount()
let cart = new shoppingBasket();
cart.addProduct(new Product("Chair", 25, new FixedDiscount(10)));
//cart.addProduct(new Product('Chair', 25, new Discount("fixed", -10)));
cart.addProduct(new Product("Table", 50, new VariableDiscount(25)));
cart.addProduct(new Product("Bed", 100, new NoDiscount())); // we don't have so specify any parameter since the constructor function has no parameter

const tableElement: any = document.querySelector("#cart tbody");
cart.products.forEach((product) => {
  let tr = document.createElement("tr");

  let td = document.createElement("td");
  td.innerText = product.name;
  tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = product.originalPrice.toFixed(2) + " €";
  tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = product.calculatePrice().toFixed(2) + " €";
  tr.appendChild(td);

  td = document.createElement("td");
  td.innerText = product.showCalculation();
  tr.appendChild(td);

  tableElement.appendChild(tr);
});
