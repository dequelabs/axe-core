#!/usr/bin/env node
const playwright = require('playwright');
const XLSX = require('xlsx');
const { setTimeout } = require('node:timers/promises');
const axe = require('../axe.js');
const { source } = axe;
const path = require('path');

const dataAoa = [
  [
    'Num Nodes',
    'Time nth-child (ms)',
    'Time base (ms)'
  ]
];
const numRuns = 5;
const basePages = {
  0: 'https://stevenklambert.com/writing/encroaching-darkness-postmortem/',
  1_000: 'https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement',
  3_000: 'https://www.amazon.com/',
  5_000: 'https://www.google.com/search?q=hello+world&oq=hello+world',
  7_000: 'https://www.youtube.com/results?search_query=code',
  10_000: 'https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary',
};

const dataNodes = {};

(async () => {
  const browser = await playwright.chromium.launch({
    headless: true
  });

  try {
    const context = await browser.newContext();
    const page = await context.newPage();

    for (let i = 0; i <= 10_000; i += 1000) {
      await perfPage(page, `http://localhost:9876/test/playground.html?nodes=${i}`, i);
    }

    for ([numNodes, url] of Object.entries(basePages)) {
      await perfPage(page, url, numNodes);
    }

    for ([numNodes, times] of Object.entries(dataNodes)) {
      dataAoa.push([numNodes, ...times]);
    }
    save();
  } finally {
    console.log(dataNodes);
    await browser.close();
  }
})();

async function perfPage(page, url, numNodes) {
  let total = 0;

  for (let num = 0; num < numRuns; num++) {
    await page.goto(url);
    await setTimeout(2000);

    const axeExist = await page.evaluate(() => !!window.axe);
    if (!axeExist) {
      await page.evaluate(source);
      await setTimeout(500);
    }

    performance.clearMarks();
    performance.clearMeasures();
    performance.mark('start');

    await page.evaluate(async () => await axe.run());

    performance.mark('end');
    performance.measure('time', 'start', 'end');
    const { duration } = performance.getEntriesByName('time')[0];
    total += duration;
  }

  const average = (total / numRuns).toFixed(2);
  dataNodes[numNodes] = dataNodes[numNodes] ?? [];
  dataNodes[numNodes].push(average);
  console.log(`average of ${numRuns} runs for ${url} and ${numNodes} nodes: ${average}ms`);
}

function save() {
  console.log(dataAoa)
  const workbook = XLSX.utils.book_new();

  const sheet = XLSX.utils.aoa_to_sheet(dataAoa);
  XLSX.utils.book_append_sheet(
    workbook,
    sheet
  );

  XLSX.writeFile(
    workbook,
    path.join(__dirname, `time.xlsx`)
  );
}