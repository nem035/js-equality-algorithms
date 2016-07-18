function doubleEqualsRunnerES5(iter, x, y) {

  iter.next('{x} == {y}');

  iter.next('Checking if {x} and {y} have the same type');
  if (areSameType(x, y)) {
    return iter.next(tripleEqualsRunnerES5(iter, x, y));
  } else {

    iter.next('Checking if {x} is null and {y} is undefined');
    if (isNull(x) && isUndefined(y)) {
      return iter.next(true);
    }

    iter.next('Checking if {x} is undefined and {y} is null');
    if (isUndefined(x) && isNull(y)) {
      return iter.next(true);
    }

    iter.next('Checking if {x} is a number and {y} is a string');
    if (isNumber(x) && isString(y)) {
      return iter.next(doubleEqualsRunnerES5(iter, x, toNumber(y)));
    }

    iter.next('Checking if {x} is a string and {y} is a number');
    if (isString(x) && isNumber(y)) {
      return iter.next(doubleEqualsRunnerES5(iter, toNumber(x), y));
    }

    iter.next('Checking if {x} is a boolean');
    if (isBoolean(x)) {
      iter.next('Coercing {x} to a number');
      return iter.next(doubleEqualsRunnerES5(iter, toNumber(x), y));
    }

    iter.next('Checking if {y} is a boolean');
    if (isBoolean(y)) {
      iter.next('Coercing {y} to a number');
      return iter.next(doubleEqualsRunnerES5(iter, x, toNumber(y)));
    }

    iter.next('Checking if {x} is a string or a number and {y} is an object');
    if (isStringOrNumber(x) && isObject(y)) {
      iter.next('Coercing {y} to a primitive');
      return iter.next(doubleEqualsRunnerES5(iter, x, toPrimitive(y)));
    }

    iter.next('Checking if {x} is an object and {y} is a string or a number');
    if (isObject(x) && isStringOrNumber(y)) {
      iter.next('Coercing {x} to a primitive');
      return iter.next(doubleEqualsRunnerES5(iter, toPrimitive(x), y));
    }
  }

  return iter.next(false);
}
