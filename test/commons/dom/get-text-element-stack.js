describe('dom.getTextElementStack', function () {
  'use strict';

  var fixture = document.getElementById('fixture');
  var getTextElementStack = axe.commons.dom.getTextElementStack;

  function mapToIDs(stack) {
    return stack
      .map(function (node) {
        return node.id;
      })
      .filter(function (id) {
        return !!id;
      });
  }

  afterEach(function () {
    fixture.innerHTML = '';
  });

  it('should return array of client text rects', function () {
    fixture.innerHTML =
      '<main id="1">' +
      '<div id="target">' +
      '<span id="2">Hello</span><br/>World' +
      '</div>' +
      '</main>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');
    var stacks = getTextElementStack(target).map(mapToIDs);
    assert.deepEqual(stacks, [['target', '1', 'fixture']]);
  });

  it('should ignore newline characters', function () {
    fixture.innerHTML =
      '<main id="1">' +
      '<div id="target">' +
      '<span id="2">Hello</span><br/>\n' +
      'World' +
      '</div>' +
      '</main>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');
    var stacks = getTextElementStack(target).map(mapToIDs);
    assert.deepEqual(stacks, [['target', '1', 'fixture']]);
  });

  it('should handle truncated text', function () {
    fixture.innerHTML =
      '<main id="1">' +
      '<div id="target" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 100px;">' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sollicitudin quam. Fusce mi odio, egestas pulvinar erat eget, vehicula tempus est. Proin vitae ullamcorper velit. Donec sagittis est justo, mattis iaculis arcu facilisis id. Proin pulvinar ornare arcu a fermentum. Quisque et dignissim nulla, sit amet consectetur ipsum. Donec in libero porttitor, dapibus neque imperdiet, aliquam est. Vivamus blandit volutpat fringilla. In mi magna, mollis sit amet imperdiet eu, rutrum ut tellus. Mauris vel condimentum nibh, quis ultricies nisi. Vivamus accumsan quam mauris, id iaculis quam fringilla ac. Curabitur pulvinar dolor ac magna vehicula, non auctor ligula dignissim. Nam ac nibh porttitor, malesuada tortor varius, feugiat turpis. Mauris dapibus, tellus ut viverra porta, ipsum turpis bibendum ligula, at tempor felis ante non libero. Donec dapibus, diam sit amet posuere commodo, magna orci hendrerit ipsum, eu egestas mauris nulla ut ipsum. Sed luctus, orci in fringilla finibus, odio leo porta dolor, eu dignissim risus eros eget erat.' +
      'World' +
      '</div>' +
      '</main>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');
    var stacks = getTextElementStack(target).map(mapToIDs);
    assert.deepEqual(stacks, [['target', '1', 'fixture']]);
  });

  it('should handle text that is too large for the container', function () {
    fixture.innerHTML =
      '<pre id="1" style="width: 400px; overflow: auto;">' +
      '<span id="target" style="display: flex; width: 400px;">\n\n' +
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et sollicitudin quam. Fusce mi odio, egestas pulvinar erat eget, vehicula tempus est. Proin vitae ullamcorper velit. Donec sagittis est justo, mattis iaculis arcu facilisis id. Proin pulvinar ornare arcu a fermentum. Quisque et dignissim nulla, sit amet consectetur ipsum. Donec in libero porttitor, dapibus neque imperdiet, aliquam est. Vivamus blandit volutpat fringilla. In mi magna, mollis sit amet imperdiet eu, rutrum ut tellus. Mauris vel condimentum nibh, quis ultricies nisi. Vivamus accumsan quam mauris, id iaculis quam fringilla ac. Curabitur pulvinar dolor ac magna vehicula, non auctor ligula dignissim. Nam ac nibh porttitor, malesuada tortor varius, feugiat turpis. Mauris dapibus, tellus ut viverra porta, ipsum turpis bibendum ligula, at tempor felis ante non libero. Donec dapibus, diam sit amet posuere commodo, magna orci hendrerit ipsum, eu egestas mauris nulla ut ipsum. Sed luctus, orci in fringilla finibus, odio leo porta dolor, eu dignissim risus eros eget erat.' +
      '</span>' +
      '</pre>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');
    var stacks = getTextElementStack(target).map(mapToIDs);
    assert.deepEqual(stacks, [['target', '1', 'fixture']]);
  });

  it('should handle text that overflows outside the parent', function () {
    fixture.innerHTML =
      '<div id="1" style="width: 250px; overflow: hidden">' +
      '<p id="target" style="max-height: 80px; overflow: hidden; line-height: 20px; font-size: 13px;">The Chandni Chowk (Moonlight Square) is one of the oldest and busiest markets in Old Delhi, India. Chandni Chowk is located close to Old Delhi Railway Station. The Red Fort monument is located within the market. It was built in the 17th century by Mughal Emperor of India Shah Jahan and designed by his daughter Jahanara. The market was once divided by canals (now closed) to reflect moonlight and remains one of India\'s largest wholesale markets.</p>' +
      '</div>';
    axe.testUtils.flatTreeSetup(fixture);
    var target = fixture.querySelector('#target');
    var stacks = getTextElementStack(target).map(mapToIDs);
    assert.deepEqual(stacks, [['target', '1', 'fixture']]);
  });
});
