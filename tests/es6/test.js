function testES6() {

  const EXCEPTION = 'hasException';

  const tests = [{
    algo: doubleEqualsES6,
    algoName: 'doubleEquals',
    operation: (x, y) => x == y,
    operator: '=='
  }, {
    algo: tripleEqualsES6,
    algoName: 'tripleEquals',
    operation: (x, y) => x === y,
    operator: '==='
  }];

  let allPassed = true;
  tests.forEach(({ algo, algoName, operation, operator }) => {
    testCasesES6.forEach((case1) => {
      testCasesES6.forEach((case2) => {

        let result;
        try {
          result = algo(case1, case2);
        } catch(e) {
          result = EXCEPTION;
        }

        let expected;
        try {
          expected = operation(case1, case2);
        } catch(e) {
          expected = EXCEPTION;
        }

        if (result !== expected) {
          allPassed = false;
          console.error(
            `${case1} ${operator} ${case2} returns ${expected}, ${algoName}(${case1}, ${case2}) returns ${result}`
          );
        }
      });
    });
  });

  return allPassed;
}
