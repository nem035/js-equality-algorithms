function toPrimitive(x) {
  if (isObject(x)) {
    return defaultValue(x);
  }
  return x;
}

function defaultValue(x) {
  var methods = isDate(x) ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
  var result;

  var success = methods.some(function(method) {
    if (isFunction(x[method])) {
      var temp = x[method]();
      if (isPrimitive(temp)) {
        result = temp;
        return true;
      }
    }
  });

  if (!success) {
    throw new TypeError('Cannot convert object to primitive value');
  }

  return result;
}

function areSameType(x, y) {
  return areEqual(type(x), type(y));
}

function type(x) {
  if (isNull(x)) {
    return 'null';
  }
  if (Object.prototype.toString.call(x) === '[object Date]') {
    return 'date';
  }
  return typeof (x);
}

function areEqual(x, y) {
  return x === y;
}

function areEqualNumberValues(x, y) {
  return areEqual(x, y);
}

function areAllCharsEqualInOrder(x, y) {
  if (!areEqual(x.length, y.length)) {
    return false;
  }
  for (var i = 0; i < x.length; i++) {
    if (!areEqual(x.charAt(i), y.charAt(i))) {
      return false;
    }
  }
  return true;
}

function areBothTrue(x, y) {
  return areEqual(x, true) && areEqual(y, true);
}

function areBothFalse(x, y) {
  return areEqual(x, false) && areEqual(y, false);
}

function areEqualNumbers(x, y) {
  return areEqual(toNumber(x), toNumber(y));
}

function toNumber(x) {
  return Number(x);
}

function areEqualReferences(x, y) {
  return areEqual(x, y);
}

function isNaN(x) {
  return !areEqual(x, x);
}

function isNegativeZero(x) {
  return areEqual(x, 0) && areEqual(1 / x, -Infinity);
}

function isPositiveZero(x) {
  return areEqual(x, 0) && !isNegativeZero(x);
}

function isObject(x) {
  return areEqual(type(x), 'object') || areEqual(type(x), 'function');
}

function isNull(x) {
  return areEqual(x, null);
}

function isUndefined(x) {
  return areEqual(x, void 0);
}

function isNumber(x) {
  return areEqual(type(x), 'number');
}

function isString(x) {
  return areEqual(type(x), 'string');
}

function isStringOrNumber(x) {
  return isString(x) || isNumber(x);
}

function isBoolean(x) {
  return areEqual(type(x), 'boolean');
}

function isFunction(x) {
  return areEqual(type(x), 'function');
}

function isDate(x) {
  return areEqual(type(x), 'date');
}

// ES6 engine will only ever have symbols
function isPrimitive(x) {
  return ~['undefined', 'null', 'boolean', 'number', 'string', 'symbol'].indexOf(type(x));
}

// ES6 engine exclusive method
function isStringOrNumberOrSymbol(x) {
  return isString(x) || isNumber(x) || isSymbol(x);
}

// ES6 engine exclusive method
function isSymbol(x) {
  return areEqual(type(x), 'symbol');
}

// ES6 engine exclusive method
function areSameSymbolValue(x, y) {
  return false; // symbol values are never the same ???
}

// ES6 engine exclusive method
function areAllCodeUnitsEqualInOrder(x, y) {
  if (!areEqual(x.length, y.length)) {
    return false;
  }
  for (var i = 0; i < x.length; i++) {
    if (!areEqual(x.charCodeAt(i), y.charCodeAt(i))) {
      return false;
    }
  }
  return true;
}
