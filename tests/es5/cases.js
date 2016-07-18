var testCasesES5 = [
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
  +0,
  -0,
  '0',
  '1',
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
    toString: function() {
      return '';
    }
  },
  {
    toString: function() {
      return '0';
    }
  },
  {
    toString: function() {
      return null;
    }
  },
  {
    toString: function() {
      return '';
    },
    valueOf: function() {
      return '';
    }
  },
  {
    toString: function() {
      return '0';
    },
    valueOf: function() {
      return '0';
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
  new Date(),
];
