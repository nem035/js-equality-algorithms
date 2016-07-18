// An implementation of the double equals (==) algorithm in JavaScript ES5
// Spec: http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3
function doubleEqualsES5(x, y) {

  // if x and y have the same type
  if (areSameType(x, y)) {
    // return the === comparison (based on the spec, this should run the code from step 2 of the === algorithm but this is a cleaner representation)
    return tripleEqualsES5(x, y);
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

    // if x is a number and y is a string
    // return the comparison x == toNumber(y)
    if (isNumber(x) && isString(y)) {
      return doubleEqualsES5(x, toNumber(y));
    }

    // if x is a string and y is a number
    // return the comparison toNumber(x) == y
    if (isString(x) && isNumber(y)) {
      return doubleEqualsES5(toNumber(x), y);
    }

    // if x is a boolean,
    // return the result of the comparison toNumber(x) == y
    if (isBoolean(x)) {
      return doubleEqualsES5(toNumber(x), y);
    }

    // if y is a boolean
    // return the result of the comparison x == toNumber(y)
    if (isBoolean(y)) {
      return doubleEqualsES5(x, toNumber(y));
    }

    // if x is either a string or a number and y is an object
    // return the result of comparison x == toPrimitive(y)
    if (isStringOrNumber(x) && isObject(y)) {
      return doubleEqualsES5(x, toPrimitive(y));
    }

    // if x is an object and y is either a string or a number
    // return the result of the comparison toPrimitive(x) == y
    if (isObject(x) && isStringOrNumber(y)) {
      return doubleEqualsES5(toPrimitive(x), y);
    }
  }

  //return false
  return false;
}
