$(() => {

  setupNavTabs();

  initValueLists();
  $('.button-run').prop('disabled', '');

  $('.button-run').click(function() {
    $('.button-run').prop('disabled', 'true');
    $('.steps').empty();

    const algorithms = getAlgorithms();
    const xDataType = getDataType('x');
    const yDataType = getDataType('y');
    const x = Object.assign({}, get(getValues(xDataType), 'x'));
    const y = Object.assign({}, get(getValues(yDataType), 'y'));
    const algorithm = get(algorithms, 'algorithm');

    run(x, y, algorithm);
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
  if (isNegativeZero(value)) return '-0';
  if (value === '') return '""';
  return JSON.stringify(value, function(key, value) {
    if (isFunction(value)) {
      return String(value)
        .split('\n')
        .join('')
        .replace(/\s+/g, ' ');
    }
    return value;
  }, 4).split('"').join('');
}

function valueToHTML(text, type) {
  return `<span class="value ${type}">${text}</span>`
}

function initValueLists() {
  const values = getValues('primitive');
  buildValueList('x', values);
  buildValueList('y', values);
}

function buildValueList(type, values) {
  const $valList = $(`.values.${type}`);
  $valList.empty();
  values.forEach((value) => {
    const $option = $('<option></option>');
    $option.attr('value', value.id);
    $option.text(value.text);
    $valList.append($option);
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

function valueBuilderFactory(dataType) {
  let values;
  const temp = (dataType === 'primitive') ? getPrimitives() : getNonPrimitives();

  return function build() {
    if (!isUndefined(values)) {
      return values;
    }

    values = temp.map(function(value, idx) {
      return {
        id: `${idx}`,
        text: valueToText(value),
        value
      };
    });

    return values;
  };
}

const getPrimitiveValues = valueBuilderFactory('primitive');
const getNonPrimitiveValues = valueBuilderFactory('non-primitive');

function getValues(dataType) {
  return (dataType === 'primitive') ? getPrimitiveValues() : getNonPrimitiveValues();
}

function getPrimitives() {
  return testCasePrimitives.slice();
}

function getNonPrimitives() {
  return testCaseNonPrimitives.slice();
}

function getAlgorithms() {
  return [{
      id: 'doubleEquals',
      method: doubleEqualsGenerator,
      skipFirstStep: false
  }, {
      id: 'tripleEquals',
      method: tripleEqualsGenerator,
      skipFirstStep: false
  }];
}

function setupNavTabs() {
  setupNavTab('x');
  setupNavTab('y');
}

function setupNavTab(type) {
  const tabs = $(`.nav-wrapper.nav-wrapper-${type} .tabs`);
  tabs.find('a').click(function() {
    tabs.find('a').toggleClass('current-item');
    const dataType = tabs.find('a.current-item').attr('data-type');
    const values = getValues(dataType);
    buildValueList(type, values);
  });
}

function getDataType(type) {
  return $(`.nav-wrapper.nav-wrapper-${type} .tabs a.current-item`).attr('data-type');
}

function toPrimitiveCoercionMethod(obj) {
  if (isDate(obj)) {
    return obj.hasOwnProperty(obj.toString) && isFunction(obj.toString) ? 'toString' : 'valueOf';
  } else {
    return obj.hasOwnProperty(obj.valueOf) && isFunction(obj.valueOf) ? 'valueOf' : 'toString';
  }
}
