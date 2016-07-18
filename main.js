$(() => {

  const values = [{
    id: '0',
    value: null
  }, {
    id: '1',
    value: undefined
  }, {
    id: '2',
    value: 0
  }, {
    id: '3',
    value: NaN
  }, {
    id: '4',
    value: ''
  }, {
    id: '5',
    value: false
  }, {
    id: '6',
    value: true
  }, {
    id: '7',
    value: 1
  }, {
    id: '8',
    value: -1
  }, {
    id: '9',
    value: 0
  }, {
    id: '10',
    value: -0
  }, {
    id: '11',
    value: '0'
  }, {
    id: '12',
    value: '1'
  }, {
    id: '13',
    value: []
  }, {
    id: '14',
    value: [0]
  }, {
    id: '15',
    value: [null]
  }, {
    id: '16',
    value: [undefined]
  }, {
    id: '17',
    value: ['']
  }, {
    id: '18',
    value: [false]
  }, {
    id: '19',
    value: [1, 2]
  }, {
    id: '20',
    value: {}
  }, {
    id: '21',
    value: { a: 1 }
  }].map(function(v) {
    v.text = valueToText(v.value);
    return v;
  });

  const algorithms = [{
      id: 'doubleEquals',
      method: doubleEqualsGeneratorES5
  }, {
      id: 'tripleEquals',
      method: tripleEqualsGeneratorES5
  }];

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
  const runner = algorithm.method(x, y, algorithm.skip);

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
  if (isString(value)) {
    showStep(value);
    return false;
  } else if (isBoolean(value)) {
    showResult(value);
    return false;
  }
  return true;
}

function showOperation(text) {
  showStep(text).addClass('operation');
}

function showStep(result) {
  const step = buildStep(result);
  $('.steps').append(step);
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
  return isUndefined(value) ? 'undefined' : JSON.stringify(value);
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
