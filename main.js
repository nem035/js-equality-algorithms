function *loop() {
  const { x, y } = yield;
  while(true) {
    const val = yield;
    if (isString(val)) {
      console.log(`STEP: ${val.replace('{x}', x).replace('{y}', y)}`);
    } else if (isBoolean(val)) {
      console.log(`RESULT: ${val}
      `);
      break;
    }
  }
}

testCasesES5.forEach(function(x) {
  testCasesES5.forEach(function(y) {
    const iter = loop();
    iter.next();
    iter.next({ x, y })
    run(iter, x, y);
  });
});

function run(iter, x, y) {
  doubleEqualsRunnerES5(iter, x, y);
}
