function *doubleEqualsGeneratorES5(x, y) {

  yield `Operation: ${xToHTML(x)} == ${yToHTML(y)}`;

  yield `Checking if x and y have the same type`;
  if (areSameType(x.value, y.value)) {

    return run(x, y, {
      method: tripleEqualsGeneratorES5,
      skipFirstStep: true
    });
  } else {

    yield `Checking if x is null and y is undefined`;
    if (isNull(x.value) && isUndefined(y.value)) {
      return true;
    }

    yield `Checking if x is undefined and y is null`;
    if (isUndefined(x.value) && isNull(y.value)) {
      return true;
    }

    yield `Checking if x is a number and y is a string`;
    if (isNumber(x.value) && isString(y.value)) {
      yield `Coercing y to a number`;
      y.value = toNumber(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if x is a string and y is a number`;
    if (isString(x.value) && isNumber(y.value)) {
      yield `Coercing x to a number`;
      x.value = toNumber(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if x is a boolean`;
    if (isBoolean(x.value)) {
      yield `Coercing x to a number`;
      x.value = toNumber(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if y is a boolean`;
    if (isBoolean(y.value)) {
      yield `Coercing y to a number`;
      y.value = toNumber(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if x is a string or a number and y is an object`;
    if (isStringOrNumber(x.value) && isObject(y.value)) {
      yield `Coercing y to a primitive`;
      y.value = toPrimitive(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if x is an object and y is a string or a number`;
    if (isObject(x.value) && isStringOrNumber(y.value)) {
      yield `Coercing x to a primitive`;
      x.value = toPrimitive(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }
  }

  return false;
}
