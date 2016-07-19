function *doubleEqualsGenerator(x, y) {

  yield `Operation: ${xToHTML(x)} == ${yToHTML(y)}`;

  yield `Checking if <code>x</code> and <code>y</code> have the same type`;
  if (areSameType(x.value, y.value)) {

    return run(x, y, {
      method: tripleEqualsGenerator,
      skipFirstStep: true
    });
  } else {

    yield `Checking if <code>x</code> is null and <code>y</code> is undefined`;
    if (isNull(x.value) && isUndefined(y.value)) {
      return true;
    }

    yield `Checking if <code>x</code> is undefined and <code>y</code> is null`;
    if (isUndefined(x.value) && isNull(y.value)) {
      return true;
    }

    yield `Checking if <code>x</code> is a number and <code>y</code> is a string`;
    if (isNumber(x.value) && isString(y.value)) {
      yield `Coercing <code>y</code> to a number`;
      y.value = toNumber(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGenerator
      });
    }

    yield `Checking if <code>x</code> is a string and <code>y</code> is a number`;
    if (isString(x.value) && isNumber(y.value)) {
      yield `Coercing <code>x</code> to a number`;
      x.value = toNumber(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGenerator
      });
    }

    yield `Checking if <code>x</code> is a boolean`;
    if (isBoolean(x.value)) {
      yield `Coercing <code>x</code> to a number`;
      x.value = toNumber(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGenerator
      });
    }

    yield `Checking if <code>y</code> is a boolean`;
    if (isBoolean(y.value)) {
      yield `Coercing <code>y</code> to a number`;
      y.value = toNumber(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGenerator
      });
    }

    yield `Checking if <code>x</code> is a string or a number and <code>y</code> is an object`;
    if (isStringOrNumber(x.value) && isObject(y.value)) {
      let method = isDate(y.value) ? 'toString' : 'valueOf';
      yield `Coercing <code>y</code> to a primitive using <code>${method}</code>`;
      y.value = toPrimitive(y.value);
      y.text = valueToText(y.value);
      return run(x, y, {
        method: doubleEqualsGenerator
      });
    }

    yield `Checking if <code>x</code> is an object and <code>y</code> is a string or a number`;
    if (isObject(x.value) && isStringOrNumber(y.value)) {
      yield `Coercing <code>x</code> to a primitive`;
      x.value = toPrimitive(x.value);
      x.text = valueToText(x.value);
      return run(x, y, {
        method: doubleEqualsGenerator
      });
    }
  }

  return false;
}
