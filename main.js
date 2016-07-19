$(() => {

  const values = buildValues();
  const algorithms = getAlgorithms();

  buildValueLists(values);
  $('.button-run').prop('disabled', '');

  $('.button-run').click(function() {
    $('.button-run').prop('disabled', 'true');
    $('.steps').empty();

    const value1 = Object.assign({}, get(values, 'value1'));
    const value2 = Object.assign({}, get(values, 'value2'));
    const algorithm = get(algorithms, 'algorithm');

    run(value1, value2, algorithm)
  });
});

function run(x, y, algorithm) {
  const runner = algorithm.method(x, y, algorithm.skipFirstStep);

  showOperation(runner.next().value);
  const interval = setInterval(() => {
    if (step(runner)) {
      clearInterval(interval);
      $('.button-run').prop('disabled', '');
    }
  }, 600);
}

function step(runner) {
  const { value } = runner.next();
  if (isBoolean(value)) {
    showResult(value);
    return true;
  }
  if (isString(value)) {
    showStep(value);
  }
  return false;
}

function showOperation(text) {
  showStep(text).addClass('operation');
}

function showStep(result) {
  const step = buildStep(result);
  $('.steps').append(step);
  scrollToBottom(document.body);
  return step;
}

function showResult(result) {
  showStep(result).addClass('result')
    .addClass(result ? 'true' : 'false');
}

function buildStep(result) {
  return $('<li></li>')
    .addClass('step')
    .html((result === true) || (result === false) ? `${result}` : result);
}

function xToHTML(x) {
  return valueToHTML(x.text, 'x');
}

function yToHTML(y) {
  return valueToHTML(y.text, 'y');
}

function valueToText(value) {
  if (isNaN(value)) return 'NaN';
  if (isDate(value)) return 'new Date()';
  if (isUndefined(value)) return 'undefined';
  return JSON.stringify(value, function(key, value) {
    if (isFunction(value)) return String(value);
    return value;
  }, 2);
}

function valueToHTML(text, type) {
  return `<span class="value ${type}">${text}</span>`
}

function buildValueLists(values) {

  $('.values').each((idx, valList) => {
    const $valList = $(valList);

    values.forEach((value) => {
      const $option = $('<option></option>');
      $option.attr('value', value.id);
      $option.text(value.text);
      $valList.append($option);
    });
  });
}

function get(values, type) {
  const id = $(`.${type}`).val();
  return values.find(v => v.id === id);
}

function scrollToBottom(elem) {
  const $elem = $(elem);
  $elem.scrollTop($elem.prop('scrollHeight'));
}

function buildValues() {
  return testCasesES5.slice(0, 22).map(function(value, idx) {
    return {
      id: `${idx}`,
      text: valueToText(value),
      value
    };
  });
}

function getAlgorithms() {
  return [{
      id: 'doubleEquals',
      method: doubleEqualsGeneratorES5,
      skipFirstStep: false
  }, {
      id: 'tripleEquals',
      method: tripleEqualsGeneratorES5,
      skipFirstStep: false
  }];
}
