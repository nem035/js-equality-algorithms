var testCasePrimitives = [
  null,
  undefined,
  false,
  true,
  '',
  0,
  1,
  -1,
  0,
  -0,
  NaN,
  Infinity,
  -Infinity,
  '0',
  '1'
];

var testCaseNonPrimitives = [
  [],
  [null],
  [undefined],
  [false],
  [true],
  [''],
  [0],
  [1],
  [-1],
  [0],
  [-0],
  [NaN],
  [Infinity],
  [-Infinity],
  ['0'],
  ['1'],
  {},
  { a: 1 },
  {
    valueOf: function() {
      return 'Custom string from valueOf';
    }
  },
  {
    valueOf: function() {
      return {};
    },
    toString: function() {
      return 'Custom string from toString';
    }
  },
  {
    toString: function() {
      return 'Custom string from toString';
    }
  },
  {
    toString: function() {
      return 'Custom string from toString';
    },
    valueOf: function() {
      return {};
    }
  },
  {
    toString: function() {
      return {};
    },
    valueOf: function() {
      return {};
    }
  },
  function() {},
  function a() { return 1; },
  new Date()
];

var testCases = testCasePrimitives.concat(testCaseNonPrimitives);
