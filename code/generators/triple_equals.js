function *tripleEqualsGenerator(x, y, skipFirstStep = false) {
  yield `Operation: <pre>${xToHTML(x)} === ${yToHTML(y)}</pre>`;

  if (!skipFirstStep) {
    yield `Checking if <code>x</code> and <code>y</code> have a different type`;
    if (!areSameType(x.value, y.value)) {
      return false;
    }
  }

  yield `Checking if <code>x</code> is undefined`;
  if (isUndefined(x.value)) {
    return true;
  }

  yield `Checking if <code>x</code> is null`;
  if (isNull(x.value)) {
    return true;
  }

  yield `Checking if <code>x</code> is a number`;
  if (isNumber(x.value)) {

    yield `Checking if <code>x</code> is NaN`;
    if (isNaN(x.value)) {
      return false;
    }

    yield `Checking if <code>y</code> is NaN`;
    if (isNaN(y.value)) {
      return false;
    }

    yield `Checking if <code>x</code> and <code>y</code> have equal Number values`;
    if (areEqualNumberValues(x.value, y.value)) {
      return true;
    }

    yield `Checking if <code>x</code> is +0 and <code>y</code> is -0`;
    if (isPositiveZero(x.value) && isNegativeZero(y.value)) {
      return true;
    }

    yield `Checking if <code>x</code> is -0 and <code>y</code> is +0`;
    if (isNegativeZero(x.value) && isPositiveZero(y.value)) {
      return true;
    }

    return false;
  }

  yield `Checking if <code>x</code> is a string`;
  if (isString(x.value)) {

    yield `Comparing character sequences of <code>x</code> and y`;
    if (areAllCharsEqualInOrder(x.value, y.value)) {
      return true;
    }

    return false;
  }

  yield `Checking if <code>x</code> is a boolean`;
  if (isBoolean(x.value)) {

    yield `Checking if <code>x</code> and <code>y</code> are both true or both false`;
    if (areBothTrue(x.value, y.value) || areBothFalse(x.value, y.value)) {
      return true;
    }

    return false;
  }

  yield `Checking if <code>x</code> and <code>y</code> are the same object`;
  if (areEqualReferences(x.value, y.value)) {
    return true;
  }

  return false;
}
