// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"classes/FixedDiscount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FixedDiscount = void 0; // Inside the class, use the same PROPERTIES & METHODS from the interface. -> this applies for the next 2 classes too
// This class will only return the fixed discount [apply()] & return the calculated price [showCalculation()]

var FixedDiscount =
/** @class */
function () {
  function FixedDiscount(value) {
    this._value = value;
  }

  FixedDiscount.prototype.apply = function (price) {
    return Math.max(0, price - this._value);
  };

  FixedDiscount.prototype.showCalculation = function (price) {
    return price + "??? -  " + this._value + "??? (min 0 ???)";
  };

  return FixedDiscount;
}();

exports.FixedDiscount = FixedDiscount;
},{}],"classes/NoDiscount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NoDiscount = void 0;

var NoDiscount =
/** @class */
function () {
  function NoDiscount() {
    this._value = 0; // in the constructor value = 0 because there is no discount
  }

  NoDiscount.prototype.apply = function (price) {
    return price;
  };

  NoDiscount.prototype.showCalculation = function (price) {
    return "No discount";
  };

  return NoDiscount;
}();

exports.NoDiscount = NoDiscount;
},{}],"classes/VariableDIscount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VariableDiscount = void 0;

var VariableDiscount =
/** @class */
function () {
  function VariableDiscount(value) {
    this._value = value;
  }

  VariableDiscount.prototype.apply = function (price) {
    return price - price * this._value / 100;
  };

  VariableDiscount.prototype.showCalculation = function (price) {
    return price + " ??? -  " + this._value + "%";
  };

  return VariableDiscount;
}();

exports.VariableDiscount = VariableDiscount;
},{}],"new.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FixedDiscount_1 = require("./classes/FixedDiscount");

var NoDiscount_1 = require("./classes/NoDiscount");

var VariableDIscount_1 = require("./classes/VariableDIscount"); //This is called a Union, the discountType can only contain the following 2 values:
// type discountType = "variable" | "fixed" | "none";
// class Discount {
//   private _type: discountType;
//   private _value: number;
//   constructor(type: discountType, value: number = 0) {
//     this._type = type;
//     this._value = value;
//     if (this._type != "none" && value <= 0) {
//       throw new Error(
//         "You cannot create a " + this._type + " discount with a negative value"
//       );
//     }
//   }
//   apply(price: number): number {
//     //@todo: instead of using magic values as string in this, it would be a lot better to change them into constant. This would protect us from misspellings. Can you improve this?
//     if (this._type === "none") {
//       return price;
//     } else if (this._type === "variable") {
//       return price - (price * this._value) / 100;
//     } else if (this._type === "fixed") {
//       return Math.max(0, price - this._value);
//     } else {
//       throw new Error("Invalid type of discount");
//     }
//   }
//   showCalculation(price: number): string {
//     if (this._type === "none") {
//       return "No discount";
//     } else if (this._type === "variable") {
//       return price + " ??? -  " + this._value + "%";
//     } else if (this._type === "fixed") {
//       return price + "??? -  " + this._value + "??? (min 0 ???)";
//     } else {
//       throw new Error("Invalid type of discount");
//     }
//   }
// }
/////////////////////////////////////////


var Product =
/** @class */
function () {
  function Product(name, price, discount) {
    this._name = name;
    this._price = price;
    this._discount = discount;
  }

  Object.defineProperty(Product.prototype, "name", {
    get: function get() {
      return this._name;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Product.prototype, "discount", {
    get: function get() {
      return this._discount;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Product.prototype, "originalPrice", {
    get: function get() {
      return this._price;
    },
    enumerable: false,
    configurable: true
  }); //The reason we call this function "calculateX" instead of using a getter on Price is because names communicate a lot of meaning between programmers.
  //most programmers would assume a getPrice() would be a simple display of a property that is already calculated, but in fact this function does a (more expensive) operation to calculate on the fly.

  Product.prototype.calculatePrice = function () {
    return this._discount.apply(this._price);
  };

  Product.prototype.showCalculation = function () {
    return this._discount.showCalculation(this._price);
  };

  return Product;
}();

var shoppingBasket =
/** @class */
function () {
  function shoppingBasket() {
    //this array only accepts Product objects, nothing else
    this._products = [];
  }

  Object.defineProperty(shoppingBasket.prototype, "products", {
    get: function get() {
      return this._products;
    },
    enumerable: false,
    configurable: true
  });

  shoppingBasket.prototype.addProduct = function (product) {
    this._products.push(product);
  };

  return shoppingBasket;
}(); // The new object was created in relation with the Discount class.
// Since I have a Discount interface that is implemented in the rest of the classes ( fix, no, variable DISCOUNT)
// I used the constructor of those classes to create a new FixedDiscount(10), VariableDiscount(25) & NoDiscount()


var cart = new shoppingBasket();
cart.addProduct(new Product("Chair", 25, new FixedDiscount_1.FixedDiscount(10))); //cart.addProduct(new Product('Chair', 25, new Discount("fixed", -10)));

cart.addProduct(new Product("Table", 50, new VariableDIscount_1.VariableDiscount(25)));
cart.addProduct(new Product("Bed", 100, new NoDiscount_1.NoDiscount())); // we don't have so specify any parameter since the constructor function has no parameter

var tableElement = document.querySelector("#cart tbody");
cart.products.forEach(function (product) {
  var tr = document.createElement("tr");
  var td = document.createElement("td");
  td.innerText = product.name;
  tr.appendChild(td);
  td = document.createElement("td");
  td.innerText = product.originalPrice.toFixed(2) + " ???";
  tr.appendChild(td);
  td = document.createElement("td");
  td.innerText = product.calculatePrice().toFixed(2) + " ???";
  tr.appendChild(td);
  td = document.createElement("td");
  td.innerText = product.showCalculation();
  tr.appendChild(td);
  tableElement.appendChild(tr);
});
},{"./classes/FixedDiscount":"classes/FixedDiscount.js","./classes/NoDiscount":"classes/NoDiscount.js","./classes/VariableDIscount":"classes/VariableDIscount.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53782" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","new.js"], null)
//# sourceMappingURL=/new.0ac14a2a.js.map