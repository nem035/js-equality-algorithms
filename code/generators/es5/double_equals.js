function *doubleEqualsGeneratorES5(x, y) {

  yield `Operation: ${xToHTML(x)} == ${yToHTML(y)}`;

  yield `Checking if ${xToHTML(x)} and ${yToHTML(y)} have the same type`;
  if (areSameType(x.value, y.value)) {

    return run(x, y, {
      method: tripleEqualsGeneratorES5,
      skip: true
    });
  } else {

    yield `Checking if ${xToHTML(x)} is null and ${yToHTML(y)} is undefined`;
    if (isNull(x.value) && isUndefined(y.value)) {
      return true;
    }

    yield `Checking if ${xToHTML(x)} is undefined and ${yToHTML(y)} is null`;
    if (isUndefined(x.value) && isNull(y.value)) {
      return true;
    }

    yield `Checking if ${xToHTML(x)} is a number and ${yToHTML(y)} is a string`;
    if (isNumber(x.value) && isString(y.value)) {
      yield `Coercing ${yToHTML(y)} to a number`;
      y.value = toNumber(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if ${xToHTML(x)} is a string and ${yToHTML(y)} is a number`;
    if (isString(x.value) && isNumber(y.value)) {
      yield `Coercing ${xToHTML(x)} to a number`;
      x.value = toNumber(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if ${xToHTML(x)} is a boolean`;
    if (isBoolean(x.value)) {
      yield `Coercing ${xToHTML(x)} to a number`;
      x.value = toNumber(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if ${yToHTML(y)} is a boolean`;
    if (isBoolean(y.value)) {
      yield `Coercing ${yToHTML(y)} to a number`;
      y.value = toNumber(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if ${xToHTML(x)} is a string or a number and ${yToHTML(y)} is an object`;
    if (isStringOrNumber(x.value) && isObject(y.value)) {
      yield `Coercing ${yToHTML(y)} to a primitive`;
      y.value = toPrimitive(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if ${xToHTML(x)} is an object and ${yToHTML(y)} is a string or a number`;
    if (isObject(x.value) && isStringOrNumber(y.value)) {
      yield `Coercing ${xToHTML(x)} to a primitive`;
      x.value = toPrimitive(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }
  }

  return false;
}
