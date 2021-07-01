"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixedDiscount = void 0;
// Inside the class, use the same PROPERTIES & METHODS from the interface. -> this applies for the next 2 classes too
// This class will only return the fixed discount [apply()] & return the calculated price [showCalculation()]
var FixedDiscount = /** @class */ (function () {
    function FixedDiscount(value) {
        this._value = value;
    }
    FixedDiscount.prototype.apply = function (price) {
        return Math.max(0, price - this._value);
    };
    FixedDiscount.prototype.showCalculation = function (price) {
        return price + "€ -  " + this._value + "€ (min 0 €)";
    };
    return FixedDiscount;
}());
exports.FixedDiscount = FixedDiscount;
