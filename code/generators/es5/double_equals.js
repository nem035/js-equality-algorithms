function *doubleEqualsGeneratorES5(x, y) {

  yield `Operation: ${xToHTML(x)} == ${yToHTML(y)}`;

  yield `Checking if <strong>x</strong> and <strong>y</strong> have the same type`;
  if (areSameType(x.value, y.value)) {

    return run(x, y, {
      method: tripleEqualsGeneratorES5,
      skipFirstStep: true
    });
  } else {

    yield `Checking if <strong>x</strong> is null and <strong>y</strong> is undefined`;
    if (isNull(x.value) && isUndefined(y.value)) {
      return true;
    }

    yield `Checking if <strong>x</strong> is undefined and <strong>y</strong> is null`;
    if (isUndefined(x.value) && isNull(y.value)) {
      return true;
    }

    yield `Checking if <strong>x</strong> is a number and <strong>y</strong> is a string`;
    if (isNumber(x.value) && isString(y.value)) {
      yield `Coercing <strong>y</strong> to a number`;
      y.value = toNumber(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if <strong>x</strong> is a string and <strong>y</strong> is a number`;
    if (isString(x.value) && isNumber(y.value)) {
      yield `Coercing <strong>x</strong> to a number`;
      x.value = toNumber(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if <strong>x</strong> is a boolean`;
    if (isBoolean(x.value)) {
      yield `Coercing <strong>x</strong> to a number`;
      x.value = toNumber(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if <strong>y</strong> is a boolean`;
    if (isBoolean(y.value)) {
      yield `Coercing <strong>y</strong> to a number`;
      y.value = toNumber(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if <strong>x</strong> is a string or a number and <strong>y</strong> is an object`;
    if (isStringOrNumber(x.value) && isObject(y.value)) {
      yield `Coercing <strong>y</strong> to a primitive`;
      y.value = toPrimitive(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }

    yield `Checking if <strong>x</strong> is an object and <strong>y</strong> is a string or a number`;
    if (isObject(x.value) && isStringOrNumber(y.value)) {
      yield `Coercing <strong>x</strong> to a primitive`;
      x.value = toPrimitive(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGeneratorES5
      });
    }
  }

  return false;
}
