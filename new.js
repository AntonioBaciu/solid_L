"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FixedDiscount_1 = require("./classes/FixedDiscount");
var NoDiscount_1 = require("./classes/NoDiscount");
var VariableDIscount_1 = require("./classes/VariableDIscount");
var Product = /** @class */ (function () {
    function Product(name, price, discount) {
        this._name = name;
        this._price = price;
        this._discount = discount;
    }
    Object.defineProperty(Product.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "discount", {
        get: function () {
            return this._discount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Product.prototype, "originalPrice", {
        get: function () {
            return this._price;
        },
        enumerable: false,
        configurable: true
    });
    //The reason we call this function "calculateX" instead of using a getter on Price is because names communicate a lot of meaning between programmers.
    //most programmers would assume a getPrice() would be a simple display of a property that is already calculated, but in fact this function does a (more expensive) operation to calculate on the fly.
    Product.prototype.calculatePrice = function () {
        return this._discount.apply(this._price);
    };
    Product.prototype.showCalculation = function () {
        return this._discount.showCalculation(this._price);
    };
    return Product;
}());
var shoppingBasket = /** @class */ (function () {
    function shoppingBasket() {
        //this array only accepts Product objects, nothing else
        this._products = [];
    }
    Object.defineProperty(shoppingBasket.prototype, "products", {
        get: function () {
            return this._products;
        },
        enumerable: false,
        configurable: true
    });
    shoppingBasket.prototype.addProduct = function (product) {
        this._products.push(product);
    };
    return shoppingBasket;
}());
// The new object was created in relation with the Discount class.
// Since I have a Discount interface that is implemented in the rest of the classes ( fix, no, variable DISCOUNT)
// I used the constructor of those classes to create a new FixedDiscount(10), VariableDiscount(25) & NoDiscount()
var cart = new shoppingBasket();
cart.addProduct(new Product("Chair", 25, new FixedDiscount_1.FixedDiscount(10)));
//cart.addProduct(new Product('Chair', 25, new Discount("fixed", -10)));
cart.addProduct(new Product("Table", 50, new VariableDIscount_1.VariableDiscount(25)));
cart.addProduct(new Product("Bed", 100, new NoDiscount_1.NoDiscount())); // we don't have so specify any parameter since the constructor function has no parameter
var tableElement = document.querySelector("#cart tbody");
cart.products.forEach(function (product) {
    var tr = document.createElement("tr");
    var td = document.createElement("td");
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
