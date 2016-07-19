# JavaScript Equality Algorithms

(Loose) implementation of the double equals (==) and triple equals (===) algorithms in JavaScript, showing the steps the JavaScript engine takes to evaluate both operations and how the operations are related.

### [Live Demo](https://nem035.github.io/js-equality-algorithms/)

## Algorithms

The algorithms are in the `/code/algorithms` folder of this repo. If you want to have a quick look, here's a [Gist with algorithm implementations](https://gist.github.com/nem035/9f195e15b83d464d8cce8768f93b9e90)

### ==

Implementation based on the [Spec](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3)

```javascript
function doubleEquals(x, y) {

  // if x and y have the same type
  if (areSameType(x, y)) {
    // return the === comparison (based on the spec, this should run the code from step 2 of the === algorithm but this is a cleaner representation)
    return tripleEquals(x, y);
  }
  // x and y have a different type
  else {

    // if x is null and y is undefined,
    // return true
    if (isNull(x) && isUndefined(y)) {
      return true;
    }

    // if x is undefined and y is null,
    // return true
    if (isUndefined(x) && isNull(y)) {
      return true;
    }

    // if x is a number and y is a string
    // return the comparison x == toNumber(y)
    if (isNumber(x) && isString(y)) {
      return doubleEquals(x, toNumber(y));
    }

    // if x is a string and y is a number
    // return the comparison toNumber(x) == y
    if (isString(x) && isNumber(y)) {
      return doubleEquals(toNumber(x), y);
    }

    // if x is a boolean,
    // return the result of the comparison toNumber(x) == y
    if (isBoolean(x)) {
      return doubleEquals(toNumber(x), y);
    }

    // if y is a boolean
    // return the result of the comparison x == toNumber(y)
    if (isBoolean(y)) {
      return doubleEquals(x, toNumber(y));
    }

    // if x is either a string or a number and y is an object
    // return the result of comparison x == toPrimitive(y)
    if (isStringOrNumber(x) && isObject(y)) {
      return doubleEquals(x, toPrimitive(y));
    }

    // if x is an object and y is either a string or a number
    // return the result of the comparison toPrimitive(x) == y
    if (isObject(x) && isStringOrNumber(y)) {
      return doubleEquals(toPrimitive(x), y);
    }
  }

  //return false
  return false;
}
```

### ===

Implementation based on the [Spec](http://www.ecma-international.org/ecma-262/5.1/#sec-11.9.6)

```javascript
function tripleEquals(x, y) {
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

    // if both are the exactly same sequence of characters
    // (same length and same characters in corresponding positions),
    // return true
    if (areAllCharsEqualInOrder(x, y)) {
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

  // if both refer to the same object,
  // return true
  if (areEqualReferences(x, y)) {
    return true;
  }

  // otherwise return false
  return false;
}
```
