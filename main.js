$(() => {

  setupNavTabs();

  initValueLists();
  $('.button-run').prop('disabled', '');

  $('.button-run').click(function() {
    $('.button-run').prop('disabled', 'true');
    $('.steps').empty();
    $('p.text-info').hide();

    const algorithms = getAlgorithms();
    const xDataType = getDataType('x');
    const yDataType = getDataType('y');
    const xValues = getValues(xDataType, 'x');
    const yValues = getValues(yDataType, 'y');
    const x = Object.assign({}, extract(xValues, 'x'));
    const y = Object.assign({}, extract(yValues, 'y'));
    const algorithm = extract(algorithms, 'algorithm');

    run(x, y, algorithm);
  });
});

function run(x, y, algorithm) {
  const runner = algorithm.method(x, y, algorithm.skipFirstStep);
  const isAnimated = $('input[type="checkbox"]').is(':checked');

  showOperation(runner.next().value, isAnimated);

  if (isAnimated) {
    const interval = setInterval(() => {
      if (step(runner, isAnimated)) {
        clearInterval(interval);
        finish();
      }
    }, 600);
  } else {
    while (true) {
      if (step(runner, isAnimated)) {
        finish();
        scrollToBottom(document.body);
        break;
      }
    }
  }
}

function step(runner, isAnimated) {
  const { value } = runner.next();

  if (isBoolean(value)) {
    showResult(value, isAnimated);
    return true;
  }

  if (isUndefined(value)) {
    return true;
  }

  if (isString(value)) {
    showStep(value, isAnimated);
  }

  return false;
}

function finish() {
  $('.button-run').prop('disabled', '');
}

function showOperation(text, isAnimated) {
  showStep(text, isAnimated).addClass('operation');
}

function showStep(result, isAnimated) {
  const step = buildStep(result);
  $('.steps').append(step);
  if (isAnimated) {
    scrollToBottom(document.body);
  }
  return step;
}

function showResult(result, isAnimated) {
  showStep(result, isAnimated).addClass('result')
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
  if (isString(value)) return `'${value}'`;
  if (!isObject(value)) return String(value);
  if (isFunction(value)) {
    return String(value)
      .split('\n')
      .join('')
      .replace(/\s+/g, ' ');
  }
  return JSON.stringify(value, function(key, value) {
    if (isPrimitive(value) || isFunction(value)) {
      return valueToText(value);
    }
    return value;
  }, 4).split('"').join('');
}

function valueToHTML(text, type) {
  return `<span class="value ${type}">${text}</span>`
}

function initValueLists() {
  buildValueList('x', getValues('primitive', 'x'));
  buildValueList('y', getValues('primitive', 'y'));
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

function extract(values, type) {
  const id = $(`.${type}`).val();
  return values.find(v => v.id === id);
}

function scrollerFactory() {
  let isScrolling = false;
  return function(elem) {
    if (!isScrolling) {
      isScrolling = true;
      const $elem = $(elem);
      $elem.animate({
        scrollTop: $elem.prop('scrollHeight')
      }, '100', 'swing', function() {
        isScrolling = false;
      });
    }
  }
}
const scrollToBottom = scrollerFactory();

function valueBuilderFactory(dataType) {
  let values;
  const temp = (dataType === 'primitive') ? testCasePrimitives : testCaseNonPrimitives;

  return function build() {
    // values are cached
    if (!isUndefined(values)) {
      return values;
    }

    values = temp.map((value, idx) => {
      return {
        id: `${idx}`,
        text: valueToText(value),
        value: copyValue(value)
      };
    });

    return values;
  };
}

function copyValue(value) {
  if (isPrimitive(value)) {
    return value;
  }
  if (isDate(value)) {
    return new Date(value);
  }
  if (Array.isArray(value)) {
    return $.extend(true, [], value);
  }
  return $.extend(true, {}, value);
}

const getPrimitiveValuesForX = valueBuilderFactory('primitive');
const getNonPrimitiveValuesForX = valueBuilderFactory('non-primitive');
const getPrimitiveValuesForY = valueBuilderFactory('primitive');
const getNonPrimitiveValuesForY = valueBuilderFactory('non-primitive');

function getValueGettersForType(type) {
  if (type === 'x') {
    return {
      'primitive': getPrimitiveValuesForX,
      'non-primitive': getNonPrimitiveValuesForX
    };
  }
  return {
    'primitive': getPrimitiveValuesForY,
    'non-primitive': getNonPrimitiveValuesForY
  };
}

function getValues(dataType, type) {
  return getValueGettersForType(type)[dataType]();
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
    const values = getValues(dataType, type);
    buildValueList(type, values);
  });
}

function getDataType(type) {
  return $(`.nav-wrapper.nav-wrapper-${type} .tabs a.current-item`).attr('data-type');
}

function *toPrimitiveGenerator(obj) {
  if (isDate(obj)) {
    return `Coercing <code>y</code> to a primitive (using <code>toString</code>)`;
  } else {
    let value;

    const firstMethod = obj.hasOwnProperty('valueOf') ? 'valueOf' : 'toString';
    yield `Coercing <code>y</code> to a primitive (using <code>${firstMethod}</code>)`;
    value = obj[firstMethod]();
    if (isPrimitive(value)) {
      return true;
    }
    yield `Value <code>${valueToText(value)}</code> returned from <code>${firstMethod}</code> is not a primitive`;

    const secondMethod = firstMethod === 'valueOf' ? 'toString' : 'valueOf';
    yield `Coercing <code>y</code> to a primitive (using <code>${secondMethod}</code>)`;
    value = obj[secondMethod]();
    if (isPrimitive(value)) {
      return true;
    }

    yield `Value <code>${valueToText(value)}</code> returned from <code>${firstMethod}</code> is not a primitive`;
  }
}
