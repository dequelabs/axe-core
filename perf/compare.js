#!/usr/bin/env node

// Compare two perf/report.js outputs and print a markdown diff.
//
// usage: node perf/compare.js [--all | --axe-only] <base.json> <head.json>
//   --axe-only (default): only the top-level `axe` metric per site,
//                          plus a red/yellow/green regression indicator
//                          and the top per-metric regressions.
//   --all               : every metric (per rule, per check, etc.) per site.

const fs = require('fs');

// Regression thresholds — applied to the `axe` median, worst site wins.
// A threshold trips only when BOTH the % change AND the absolute-ms change
// exceed the thresholds, so a 20% jump on a sub-second metric (30ms of
// wall time) stays green and doesn't false-positive on runner noise.
//
// - Runs of the same code can vary on GitHub runners, so 5% is the "clearly signal,
//   not noise" line and 15% is the "definitely slower" line.
// - 100ms is the wall-time floor and is above typical inter-run jitter on ubuntu-latest.
const YELLOW_THRESHOLD = 5;
const RED_THRESHOLD = 15;
const MIN_MILLISECONDS_THRESHOLD = 100;

function formatMilliseconds(milliseconds) {
  if (!Number.isFinite(milliseconds)) {
    return '—';
  }
  return `${Math.round(milliseconds).toLocaleString()}ms`;
}

function percentChange(baseValue, headValue) {
  if (
    !Number.isFinite(baseValue) ||
    !Number.isFinite(headValue) ||
    baseValue === 0
  ) {
    return null;
  }
  return ((headValue - baseValue) / baseValue) * 100;
}

function formatPercent(baseValue, headValue) {
  const percent = percentChange(baseValue, headValue);
  if (percent === null) {
    return '—';
  }
  const sign = percent >= 0 ? '+' : '';
  return `${sign}${percent.toFixed(1)}%`;
}

function formatDiffCell(baseValue, headValue) {
  return `${formatMilliseconds(baseValue)} → ${formatMilliseconds(headValue)} (${formatPercent(baseValue, headValue)})`;
}

function findMetric(report, siteUrl, metricName) {
  return report.pages
    .find(page => page.url === siteUrl)
    ?.metrics.find(metric => metric.name === metricName);
}

function metricNamesForSite(baseReport, headReport, siteUrl) {
  // Preserve head's order (which is sorted by median desc in report.js);
  // append base-only names at the end so newly-removed metrics still show.
  const headPage = headReport.pages.find(page => page.url === siteUrl);
  const basePage = baseReport.pages.find(page => page.url === siteUrl);
  const seenMetricNames = new Set();
  const orderedMetricNames = [];
  for (const metric of headPage?.metrics ?? []) {
    if (!seenMetricNames.has(metric.name)) {
      seenMetricNames.add(metric.name);
      orderedMetricNames.push(metric.name);
    }
  }
  for (const metric of basePage?.metrics ?? []) {
    if (!seenMetricNames.has(metric.name)) {
      seenMetricNames.add(metric.name);
      orderedMetricNames.push(metric.name);
    }
  }
  return orderedMetricNames;
}

function computeStatus(baseReport, headReport, siteUrls) {
  let worstPercent = -Infinity;
  let worstMilliseconds = 0;
  let worstSite = null;
  for (const siteUrl of siteUrls) {
    const baseMetric = findMetric(baseReport, siteUrl, 'axe');
    const headMetric = findMetric(headReport, siteUrl, 'axe');
    const percent = percentChange(baseMetric?.median, headMetric?.median);
    if (percent !== null && percent > worstPercent) {
      worstPercent = percent;
      worstMilliseconds = headMetric.median - baseMetric.median;
      worstSite = siteUrl;
    }
  }
  if (worstPercent === -Infinity) {
    return {
      emoji: ':white_circle:',
      label: 'No comparable data',
      worstPercent: null,
      worstMilliseconds: null,
      worstSite: null
    };
  }
  // Both % and ms floors must be exceeded to surpass the threshold — either alone
  // is treated as noise
  const surpassedThreshold = (percentFloor, millisecondsFloor) =>
    worstPercent >= percentFloor && worstMilliseconds >= millisecondsFloor;
  const worstStats = { worstPercent, worstMilliseconds, worstSite };
  if (surpassedThreshold(RED_THRESHOLD, MIN_MILLISECONDS_THRESHOLD)) {
    return { emoji: ':red_circle:', label: 'Regression', ...worstStats };
  }
  if (surpassedThreshold(YELLOW_THRESHOLD, MIN_MILLISECONDS_THRESHOLD)) {
    return { emoji: ':yellow_circle:', label: 'Warning', ...worstStats };
  }
  return {
    emoji: ':green_circle:',
    label: 'No significant regression',
    ...worstStats
  };
}

// Cross-site cross-metric scan for the metrics that regressed most in
// absolute ms terms. The `axe` metric can net to green when one rule sped
// up and another slowed down by roughly the same amount, so we surface
// the offending sub-metrics directly.
function topRegressedMetrics(baseReport, headReport, siteUrls, limit = 5) {
  const regressions = [];
  for (const siteUrl of siteUrls) {
    for (const metricName of metricNamesForSite(
      baseReport,
      headReport,
      siteUrl
    )) {
      const baseMetric = findMetric(baseReport, siteUrl, metricName);
      const headMetric = findMetric(headReport, siteUrl, metricName);
      const percent = percentChange(baseMetric?.median, headMetric?.median);
      if (percent === null || percent <= 0) {
        continue;
      }
      const milliseconds = headMetric.median - baseMetric.median;
      // Same floors as the overall status: below both, treat as noise
      if (
        milliseconds < MIN_MILLISECONDS_THRESHOLD ||
        percent < YELLOW_THRESHOLD
      ) {
        continue;
      }
      regressions.push({ siteUrl, metricName, percent, milliseconds });
    }
  }
  regressions.sort((a, b) => b.milliseconds - a.milliseconds);
  return regressions.slice(0, limit);
}

function renderAxeOnlyReport(baseReport, headReport, siteUrls) {
  const status = computeStatus(baseReport, headReport, siteUrls);
  const worstDescription =
    status.worstPercent === null
      ? ''
      : ` (worst: \`${status.worstSite}\` at ${status.worstPercent >= 0 ? '+' : ''}${status.worstPercent.toFixed(1)}% median, ${status.worstMilliseconds >= 0 ? '+' : ''}${Math.round(status.worstMilliseconds).toLocaleString()}ms)`;
  const lines = [
    '## Performance comparison',
    '',
    // Scope the status label to `axe` so the "per-metric regressions"
    // list below can disagree without contradicting the header
    `**axe metric:** ${status.emoji} **${status.label}**${worstDescription}`,
    '',
    `Base \`${baseReport.testEngine.version}\` vs head \`${headReport.testEngine.version}\`.`,
    '',
    '| Site | Cold start | Median | Max |',
    '|------|-----------:|-------:|----:|'
  ];
  for (const siteUrl of siteUrls) {
    const baseMetric = findMetric(baseReport, siteUrl, 'axe');
    const headMetric = findMetric(headReport, siteUrl, 'axe');
    lines.push(
      `| \`${siteUrl}\` | ${formatDiffCell(baseMetric?.coldStart, headMetric?.coldStart)} | ${formatDiffCell(baseMetric?.median, headMetric?.median)} | ${formatDiffCell(baseMetric?.max, headMetric?.max)} |`
    );
  }
  const regressions = topRegressedMetrics(baseReport, headReport, siteUrls);
  if (regressions.length > 0) {
    lines.push('');
    lines.push(
      '**per-metric regressions:** (worst ms increases regardless of `axe` status)'
    );
    lines.push('');
    for (const regression of regressions) {
      lines.push(
        `- \`${regression.siteUrl}\` \`${regression.metricName}\`: +${Math.round(regression.milliseconds).toLocaleString()}ms (+${regression.percent.toFixed(1)}%)`
      );
    }
  }
  return lines.join('\n');
}

function renderFullReport(baseReport, headReport, siteUrls) {
  const lines = [
    '## Performance comparison',
    '',
    `Base \`${baseReport.testEngine.version}\` vs head \`${headReport.testEngine.version}\`. All metrics per site.`,
    ''
  ];
  for (const siteUrl of siteUrls) {
    lines.push(`### \`${siteUrl}\``);
    lines.push('');
    lines.push('| Metric | Cold start | Median | Max |');
    lines.push('|--------|-----------:|-------:|----:|');
    for (const metricName of metricNamesForSite(
      baseReport,
      headReport,
      siteUrl
    )) {
      const baseMetric = findMetric(baseReport, siteUrl, metricName);
      const headMetric = findMetric(headReport, siteUrl, metricName);
      lines.push(
        `| \`${metricName}\` | ${formatDiffCell(baseMetric?.coldStart, headMetric?.coldStart)} | ${formatDiffCell(baseMetric?.median, headMetric?.median)} | ${formatDiffCell(baseMetric?.max, headMetric?.max)} |`
      );
    }
    lines.push('');
  }
  return lines.join('\n');
}

const commandLineArguments = process.argv.slice(2);
let mode = 'axe-only';
const positionalArguments = [];
for (const argument of commandLineArguments) {
  if (argument === '--all') {
    mode = 'all';
  } else if (argument === '--axe-only') {
    mode = 'axe-only';
  } else {
    positionalArguments.push(argument);
  }
}
const [baseFilePath, headFilePath] = positionalArguments;
if (!baseFilePath || !headFilePath) {
  console.error(
    'usage: compare.js [--all | --axe-only] <base-report.json> <head-report.json>'
  );
  process.exit(1);
}

const baseReport = JSON.parse(fs.readFileSync(baseFilePath, 'utf8'));
const headReport = JSON.parse(fs.readFileSync(headFilePath, 'utf8'));
const siteUrls = [
  ...new Set([
    ...baseReport.pages.map(page => page.url),
    ...headReport.pages.map(page => page.url)
  ])
].sort();

console.log(
  mode === 'all'
    ? renderFullReport(baseReport, headReport, siteUrls)
    : renderAxeOnlyReport(baseReport, headReport, siteUrls)
);
