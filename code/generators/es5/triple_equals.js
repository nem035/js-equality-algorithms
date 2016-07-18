function *tripleEqualsGeneratorES5(x, y, skip = false) {
  yield `Operation: ${xToHTML(x)} === ${yToHTML(y)}`;

  if (!skip) {
    yield `Checking if ${xToHTML(x)} and ${yToHTML(y)} have a different type`;
    if (!areSameType(x.value, y.value)) {
      return false;
    }
  }

  yield `Checking if ${xToHTML(x)} is undefined`;
  if (isUndefined(x.value)) {
    return true;
  }

  yield `Checking if ${xToHTML(x)} is null`;
  if (isNull(x.value)) {
    return true;
  }

  yield `Checking if ${xToHTML(x)} is a number`;
  if (isNumber(x.value)) {

    yield `Checking if ${xToHTML(x)} is NaN`;
    if (isNaN(x.value)) {
      return false;
    }

    yield `Checking if ${yToHTML(y)} is NaN`;
    if (isNaN(y.value)) {
      return false;
    }

    yield `Checking if ${xToHTML(x)} and ${yToHTML(y)} have equal Number values`;
    if (areEqualNumberValues(x.value, y.value)) {
      return true;
    }

    yield `Checking if ${xToHTML(x)} is +0 and ${yToHTML(y)} is -0`;
    if (isPositiveZero(x.value) && isNegativeZero(y.value)) {
      return true;
    }

    yield `Checking if ${xToHTML(x)} is -0 and ${yToHTML(y)} is +0`;
    if (isNegativeZero(x.value) && isPositiveZero(y.value)) {
      return true;
    }

    return false;
  }

  yield `Checking if ${xToHTML(x)} is a string`;
  if (isString(x.value)) {

    yield `Comparing character sequences of ${xToHTML(x)} and ${yToHTML(y)}`;
    if (areAllCharsEqualInOrder(x.value, y.value)) {
      return true;
    }

    return false;
  }

  yield `Checking if ${xToHTML(x)} is a boolean`;
  if (isBoolean(x.value)) {

    yield `Checking if ${xToHTML(x)} and ${yToHTML(y)} are both true or both false`;
    if (areBothTrue(x.value, y.value) || areBothFalse(x.value, y.value)) {
      return true;
    }

    return false;
  }

  yield `Checking if ${xToHTML(x)} and ${yToHTML(y)} are the same object`;
  if (areEqualReferences(x.value, y.value)) {
    return true;
  }

  return false;
}
