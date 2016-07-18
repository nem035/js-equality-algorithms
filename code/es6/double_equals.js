// An implementation of the double equals (==) algorithm in JavaScript ES6
// Spec: http://www.ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison
function doubleEqualsES6(x, y) {

  // if x and y have the same type
  if (areSameType(x, y)) {
    // return the result of performing Strict Equality Comparison x === y.
    return tripleEqualsES6(x, y);
  }
  // x and y have a different type
  else {

    // if x is null and y is undefined,
    // return true
    if (isNull(x) && isUndefined(y)) {
      return true;
    }

    // if x is undefined and y is null,
    // return true
    if (isUndefined(x) && isNull(y)) {
      return true;
    }

    // if x is a number and y is a string,
    // return the comparison x == toNumber(y)
    if (isNumber(x) && isString(y)) {
      return doubleEqualsES6(x, toNumber(y));
    }

    // if x is a string and y is a number,
    // return the comparison toNumber(x) == y
    if (isString(x) && isNumber(y)) {
      return doubleEqualsES6(toNumber(x), y);
    }

    // if x is a boolean,
    // return the result of the comparison toNumber(x) == y
    if (isBoolean(x)) {
      return doubleEqualsES6(toNumber(x), y);
    }

    // if y is a boolean,
    // return the result of the comparison x == toNumber(y)
    if (isBoolean(y)) {
      return doubleEqualsES6(x, toNumber(y));
    }

    // if x is either a string, a number or a symbol and y is an object,
    // return the result of comparison x == toPrimitive(y)
    if (isStringOrNumberOrSymbol(x) && isObject(y)) {
      return doubleEqualsES6(x, toPrimitive(y));
    }

    // if x is an object and y is either a string, a number or a symbol,
    // return the result of the comparison toPrimitive(x) == y
    if (isObject(x) && isStringOrNumberOrSymbol(y)) {
      return doubleEqualsES6(toPrimitive(x), y);
    }
  }

  // otherwise return false
  return false;
}
