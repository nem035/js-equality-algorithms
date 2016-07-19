function *tripleEqualsGeneratorES5(x, y, skip = false) {
  yield `Operation: ${xToHTML(x)} === ${yToHTML(y)}`;

  if (!skip) {
    yield `Checking if <strong>x</strong> and <strong>y</strong> have a different type`;
    if (!areSameType(x.value, y.value)) {
      return false;
    }
  }

  yield `Checking if <strong>x</strong> is undefined`;
  if (isUndefined(x.value)) {
    return true;
  }

  yield `Checking if <strong>x</strong> is null`;
  if (isNull(x.value)) {
    return true;
  }

  yield `Checking if <strong>x</strong> is a number`;
  if (isNumber(x.value)) {

    yield `Checking if <strong>x</strong> is NaN`;
    if (isNaN(x.value)) {
      return false;
    }

    yield `Checking if <strong>y</strong> is NaN`;
    if (isNaN(y.value)) {
      return false;
    }

    yield `Checking if <strong>x</strong> and <strong>y</strong> have equal Number values`;
    if (areEqualNumberValues(x.value, y.value)) {
      return true;
    }

    yield `Checking if <strong>x</strong> is +0 and <strong>y</strong> is -0`;
    if (isPositiveZero(x.value) && isNegativeZero(y.value)) {
      return true;
    }

    yield `Checking if <strong>x</strong> is -0 and <strong>y</strong> is +0`;
    if (isNegativeZero(x.value) && isPositiveZero(y.value)) {
      return true;
    }

    return false;
  }

  yield `Checking if <strong>x</strong> is a string`;
  if (isString(x.value)) {

    yield `Comparing character sequences of <strong>x</strong> and y`;
    if (areAllCharsEqualInOrder(x.value, y.value)) {
      return true;
    }

    return false;
  }

  yield `Checking if <strong>x</strong> is a boolean`;
  if (isBoolean(x.value)) {

    yield `Checking if <strong>x</strong> and <strong>y</strong> are both true or both false`;
    if (areBothTrue(x.value, y.value) || areBothFalse(x.value, y.value)) {
      return true;
    }

    return false;
  }

  yield `Checking if <strong>x</strong> and <strong>y</strong> are the same object`;
  if (areEqualReferences(x.value, y.value)) {
    return true;
  }

  return false;
}
