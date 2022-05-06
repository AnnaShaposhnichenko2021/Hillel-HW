const SIZES = {
  SMALL: {
    price: 50,
    calories: 20,
  },
  MEDIUM: {
    price: 75,
    calories: 30,
  },
  BIG: {
    price: 100,
    calories: 40,
  }
};

const TOPPINGS = {
  CHEESE: {
    price: 10,
    calories: 20,
  },
  SALAD: {
    price: 20,
    calories: 5,
  },
  POTATO: {
    price: 15,
    calories: 10,
  },
  SEASONING: {
    price: 15,
    calories: 0,
  },
  MAYONNAISE: {
    price: 20,
    calories: 5,
  }
};

function CreateHamburger(size) {
  this._H_VALUES = {
    price: `price`,
    calories: `calories`
  };
  this.size = size;
  this.toppings = [];
};

CreateHamburger.prototype.addTopping = function(topping) {
  this.toppings.push(topping)
};

CreateHamburger.prototype.calcHambValues = function (valueName) {
  return this.toppings.reduce((a,e) => (a+=e[valueName]), this.size[valueName])
};
CreateHamburger.prototype.getPrice = function() {
  return this.calcHambValues(this._H_VALUES.price)
};
CreateHamburger.prototype.getCalories = function() {
  return this.calcHambValues(this._H_VALUES.calories)
};

const smallHamburger = new CreateHamburger(SIZES.SMALL);
const mediumHamburger = new CreateHamburger(SIZES.MEDIUM);
const bigHamburger = new CreateHamburger(SIZES.BIG);

smallHamburger.addTopping(TOPPINGS.CHEESE)
smallHamburger.addTopping(TOPPINGS.SALAD)

const totalPrice = smallHamburger.getPrice();
const totalCalories = smallHamburger.getCalories();
console.log('Price with toppings: ' + totalPrice + ' UAH')
console.log('Calories with toppings: ' + totalCalories + ' kcal')