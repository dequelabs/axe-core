const puppeteer = require('puppeteer');
const axeCore = require('axe-core');
const assert = require('assert');

// Cheap URL validation
const isValidURL = input => {
  try {
    const u = new URL(input);
    return u.protocol && u.host;
  } catch {
    return false;
  }
};

(async () => {
  // node axe-puppeteer.js <url>
  const url = process.argv[2];
  assert(isValidURL(url), 'Invalid URL');

  let browser;
  let results;
  try {
    // Setup Puppeteer
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
      ]
    });

    // Get new page
    const page = await browser.newPage();
    await page.goto(url);

    // Inject and run axe-core
    const handle = await page.evaluateHandle(`
			// Inject axe source code
			${axeCore.source}
			// Run axe
			axe.run()
		`);

    // Get the results from `axe.run()`.
    results = await handle.jsonValue();
    console.log(results);

    // Destroy the handle & return axe results.
    await handle.dispose();
  } catch (err) {
    // Ensure we close the puppeteer connection when possible
    if (browser) {
      await browser.close();
    }

    console.error('Error running axe-core:', err.message);
    process.exit(1);
  }

  await browser.close();
})();
