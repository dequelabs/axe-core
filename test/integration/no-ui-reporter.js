/*global mocha, console */
(function () {
  'use strict';

  if (!mocha || !mocha.reporter || !mocha.reporter('base')) {
    return;
  }

  let Base = mocha.reporter('base')._reporter;
  mocha.reporter(function (runner) {
    Base.call(this, runner);
    let passes = 0;
    let failures = 0;

    runner.on('pass', function (test) {
      passes++;
      console.log('pass: %s', test.fullTitle());
    });

    runner.on('fail', function (test, err) {
      failures++;
      console.error('fail: %s -- error: %s', test.fullTitle(), err.message);
    });

    runner.on('end', function () {
      console.log('end: %d/%d', passes, passes + failures);
      let mochaFixture = document.getElementById('mocha');
      if (mochaFixture) {
        let html = '<div style="color: ' + (failures ? 'red' : 'green') + '">';
        html += passes + '/' + (failures + passes);
        html += ' tests passed</div>';
        mochaFixture.innerHTML = html;
      }
    });
  });
})();
