var testCasePrimitives = [
  null,
  undefined,
  0,
  NaN,
  '',
  false,
  true,
  1,
  -1,
  0,
  -0,
  '0',
  '1'
];

var testCaseNonPrimitives = [
  [],
  [0],
  [null],
  [undefined],
  [''],
  [false],
  [1, 2],
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
  function() {},
  function a() { return 1; },
  new Date()
];

var testCases = testCasePrimitives.concat(testCaseNonPrimitives);
