/*global mocha, console */
(() => {
  if (!mocha || !mocha.reporter || !mocha.reporter('base')) {
    return;
  }

  const Base = mocha.reporter('base')._reporter;
  mocha.reporter(function (runner) {
    Base.call(this, runner);
    let passes = 0;
    let failures = 0;

    runner.on('pass', test => {
      passes++;
      console.log('pass: %s', test.fullTitle());
    });

    runner.on('fail', (test, err) => {
      failures++;
      console.error('fail: %s -- error: %s', test.fullTitle(), err.message);
    });

    runner.on('end', () => {
      console.log('end: %d/%d', passes, passes + failures);
      const mochaFixture = document.getElementById('mocha');
      if (mochaFixture) {
        var html = `<div style="color: ${failures ? 'red' : 'green'}">`;
        html += `${passes}/${failures}${passes}`;
        html += ' tests passed</div>';
        mochaFixture.innerHTML = html;
      }
    });
  });
})();
