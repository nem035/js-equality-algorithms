function tripleEqualsRunnerES5(iter, x, y) {
  iter.next('{x} === {y}');

  iter.next('Checking if {x} and {y} have a different type');
  if (!areSameType(x, y)) {
    return iter.next(false);
  }

  iter.next('Checking if {x} is undefined');
  if (isUndefined(x)) {
    return iter.next(true);
  }

  iter.next('Checking if {x} is null');
  if (isNull(x)) {
    return iter.next(true);
  }

  iter.next('Checking if {x} is a number');
  if (isNumber(x)) {

    iter.next('Checking if {x} is NaN');
    if (isNaN(x)) {
      return iter.next(false);
    }

    iter.next('Checking if {y} is NaN');
    if (isNaN(y)) {
      return iter.next(false);
    }

    iter.next('Checking if {x} and {y} have equal Number values');
    if (areEqualNumberValues(x, y)) {
      return iter.next(true);
    }

    iter.next('Checking if {x} is +0 and {y} is -0');
    if (isPositiveZero(x) && isNegativeZero(y)) {
      return iter.next(true);
    }

    iter.next('Checking if {x} is -0 and {y} is +0');
    if (isNegativeZero(x) && isPositiveZero(y)) {
      return iter.next(true);
    }

    return iter.next(false);
  }

  iter.next('Checking if {x} is a string');
  if (isString(x)) {

    iter.next('Comparing character sequences of {x} and {y}');
    if (areAllCharsEqualInOrder(x, y)) {
      return iter.next(true);
    }

    return iter.next(false);
  }

  iter.next('Checking if {x} is a boolean');
  if (isBoolean(x)) {

    iter.next('Checking if {x} and {y} are both true or both false');
    if (areBothTrue(x, y) || areBothFalse(x, y)) {
      return iter.next(true);
    }

    return iter.next(false);
  }

  iter.next('Checking if {x} and {y} are the same object');
  if (areEqualReferences(x, y)) {
    return iter.next(true);
  }

  return iter.next(false);
}
