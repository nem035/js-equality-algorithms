// An implementation of the triple equals (===) algorithm in JavaScript ES5
// Spec: http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.6
function tripleEqualsES6(x, y) {
  if (!areSameType(x, y)) {
    return false;
  }

  // if both are undefined,
  // return true
  if (isUndefined(x)) {
    return true;
  }

  // if both are null,
  // return true
  if (isNull(x)) {
    return true;
  }

  // if both are numbers
  if (isNumber(x)) {

    // if x is NaN,
    // return false
    if (isNaN(x)) {
      return false;
    }

    // if y is NaN,
    // return false
    if (isNaN(y)) {
      return false;
    }

    // if both have equal Number values,
    // return true
    if (areEqualNumberValues(x, y)) {
      return true;
    }

    // if x is a positive zero and y is a negative zero,
    // return true
    if (isPositiveZero(x) && isNegativeZero(y)) {
      return true;
    }

    // if x is a negative zero and y is a positive zero,
    // return true
    if (isNegativeZero(x) && isPositiveZero(y)) {
      return true;
    }

    // otherwise return false
    return false;
  }

  // if both are strings
  if (isString(x)) {

    // if both are the exactly same sequence of code units
    // (same length and same code units in corresponding indices),
    // return true
    if (areAllCodeUnitsEqualInOrder(x, y)) {
      return true;
    }

    // otherwise return false
    return false;
  }

  // if both are booleans
  if (isBoolean(x)) {

    // if both are true or both are false,
    // return true
    if (areBothTrue(x, y) || areBothFalse(x, y)) {
      return true;
    }

    // otherwise return false
    return false;
  }

  // if both are the same Symbol value,
  // return true
  if (areSameSymbolValue(x, y)) {
    return true;
  }

  // if both refer to the same object,
  // return true
  if (areEqualReferences(x, y)) {
    return true;
  }

  // otherwise return false
  return false;
}
