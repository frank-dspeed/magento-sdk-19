// external dependencies
var events = require('events');
var util = require('util');

// internal dependencies
var prototypeBase = require('../prototype_base.js');
var curry = require('../curry.js');

function Uniquecoupons() {
  this.prefix = 'uniquecoupons.';
}
util.inherits(Uniquecoupons, events.EventEmitter);


// prototypes we will be applying
var protos = {
  /**
    Allows you to retrieve information about the required store view.
  */
  getCoupon: {
    mandatory: 'couponConfigId'
  },
  applyUniqueCoupon: {
    mandatory: 'quoteId,couponConfigId'
  }
};

// creating prototypes using curry func
for (var key in protos) {
  Uniquecoupons.prototype[key] = curry(prototypeBase, key, protos[key]);
}
protos = undefined;

module.exports = Uniquecoupons;
