const assert = require('assert');
const puppeteer = require('puppeteer');
const axe = require('axe-core');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(`
    <html lang="en">
    <head>
      <title>Test Page</title>
    </head>
    <body>
      <main>
        <h1>Hello World</h1>
        <button id="empty-button"></button>
        <iframe title="iframe" srcdoc="<button id='iframe-empty-button'></button>"></iframe>
      </main>
    </body>
    </html>
  `);

  await page.evaluate(axe.source);
  const frames = page.frames();
  for (let i = 0; i < frames.length; i++) {
    await frames[i].evaluate(axe.source);
  }

  const results = await page.evaluate(`window.axe.run()`);
  assert(results.violations.length);

  await browser.close();
})();
