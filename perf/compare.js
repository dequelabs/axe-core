#!/usr/bin/env node

// Compare two perf/report.js outputs and print a markdown diff.
//
// usage: node perf/compare.js [--all | --axe-only]
//                             [--base-label <str>] [--head-label <str>]
//                             <base.json> <head.json>
//   --axe-only (default): only the top-level `axe` metric per site,
//                          plus a red/yellow/green regression indicator
//                          and the top per-metric regressions.
//   --all               : every metric (per rule, per check, etc.) per site.
//   --base-label / --head-label: label to display in the "Base X vs head Y"
//                          intro line (falls back to testEngine.version).

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

// Appended to both the axe-only comment and the full step summary. Sets
// expectations that this is a gut check, not a definitive measurement.
const DISCLAIMER =
  '_The performance comparison bot is just a rough check for spotting problems and is not authoritative. Just because something shows as being faster or slower than the current `head` does not mean it is true. All performance problems should be investigated manually._';

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

// Map a (percent, ms) pair to a severity tier: 0 = noise, 1 = yellow, 2 = red.
// A tier trips only when both the % change AND the absolute-ms change clear
// the thresholds; either falling below the noise floor demotes to 0. This
// lets the caller rank sites and pick the highest tier, so a big absolute
// regression on one site can't be masked by a bigger % regression on another
// that fails the ms floor.
function severityRank(percent, milliseconds) {
  if (milliseconds < MIN_MILLISECONDS_THRESHOLD || percent < YELLOW_THRESHOLD) {
    return 0;
  }
  if (percent >= RED_THRESHOLD) {
    return 2;
  }
  return 1;
}

function computeStatus(baseReport, headReport, siteUrls) {
  let worstRank = -1;
  let worstPercent = -Infinity;
  let worstMilliseconds = -Infinity;
  let worstSite = null;
  for (const siteUrl of siteUrls) {
    const baseMetric = findMetric(baseReport, siteUrl, 'axe');
    const headMetric = findMetric(headReport, siteUrl, 'axe');
    const percent = percentChange(baseMetric?.median, headMetric?.median);
    if (percent === null) {
      continue;
    }
    const milliseconds = headMetric.median - baseMetric.median;
    const rank = severityRank(percent, milliseconds);
    // Prefer higher rank; break ties by absolute ms impact (a bigger
    // slowdown at the same tier deserves the headline)
    if (
      rank > worstRank ||
      (rank === worstRank && milliseconds > worstMilliseconds)
    ) {
      worstRank = rank;
      worstPercent = percent;
      worstMilliseconds = milliseconds;
      worstSite = siteUrl;
    }
  }
  if (worstRank === -1) {
    return {
      emoji: ':white_circle:',
      label: 'No comparable data',
      worstPercent: null,
      worstMilliseconds: null,
      worstSite: null
    };
  }
  const worstStats = { worstPercent, worstMilliseconds, worstSite };
  if (worstRank === 2) {
    return { emoji: ':red_circle:', label: 'Regression', ...worstStats };
  }
  if (worstRank === 1) {
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
// the offending sub-metrics directly. Skip `axe` here because the headline
// section already covers it.
function topRegressedMetrics(baseReport, headReport, siteUrls, limit = 5) {
  const regressions = [];
  for (const siteUrl of siteUrls) {
    for (const metricName of metricNamesForSite(
      baseReport,
      headReport,
      siteUrl
    )) {
      if (metricName === 'axe') {
        continue;
      }
      const baseMetric = findMetric(baseReport, siteUrl, metricName);
      const headMetric = findMetric(headReport, siteUrl, metricName);
      const percent = percentChange(baseMetric?.median, headMetric?.median);
      if (percent === null || percent <= 0) {
        continue;
      }
      const milliseconds = headMetric.median - baseMetric.median;
      // Same floors as the overall status: below either threshold, treat
      // as noise (either alone can be runner jitter)
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

// Show the first 7 chars of a full 40-char git SHA (like git's default
// short-hash) so labels like SHAs stay readable in the intro line
function displayLabel(label) {
  if (/^[0-9a-f]{40}$/i.test(label)) {
    return label.substring(0, 7);
  }
  return label;
}

function renderAxeOnlyReport(
  baseReport,
  headReport,
  siteUrls,
  baseLabel,
  headLabel
) {
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
    `Base \`${displayLabel(baseLabel)}\` vs head \`${displayLabel(headLabel)}\`.`,
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
  lines.push('');
  lines.push(DISCLAIMER);
  return lines.join('\n');
}

function renderFullReport(
  baseReport,
  headReport,
  siteUrls,
  baseLabel,
  headLabel
) {
  const lines = [
    '## Performance comparison',
    '',
    `Base \`${displayLabel(baseLabel)}\` vs head \`${displayLabel(headLabel)}\`. All metrics per site.`,
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
  lines.push(DISCLAIMER);
  return lines.join('\n');
}

const commandLineArguments = process.argv.slice(2);
let mode = 'axe-only';
let baseLabelOverride = null;
let headLabelOverride = null;
const positionalArguments = [];
for (let index = 0; index < commandLineArguments.length; index++) {
  const argument = commandLineArguments[index];
  if (argument === '--all') {
    mode = 'all';
  } else if (argument === '--axe-only') {
    mode = 'axe-only';
  } else if (argument === '--base-label') {
    baseLabelOverride = commandLineArguments[++index];
  } else if (argument === '--head-label') {
    headLabelOverride = commandLineArguments[++index];
  } else {
    positionalArguments.push(argument);
  }
}
const [baseFilePath, headFilePath] = positionalArguments;
if (!baseFilePath || !headFilePath) {
  console.error(
    'usage: compare.js [--all | --axe-only] [--base-label <str>] [--head-label <str>] <base-report.json> <head-report.json>'
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
const baseLabel = baseLabelOverride ?? baseReport.testEngine.version;
const headLabel = headLabelOverride ?? headReport.testEngine.version;

console.log(
  mode === 'all'
    ? renderFullReport(baseReport, headReport, siteUrls, baseLabel, headLabel)
    : renderAxeOnlyReport(
        baseReport,
        headReport,
        siteUrls,
        baseLabel,
        headLabel
      )
);
