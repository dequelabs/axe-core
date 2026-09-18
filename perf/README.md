# Axe-core Performance

Scripts and tools for reporting and tracking axe-core performance.

- `./reports` - Generated performance reports of axe-core.
- `./sites` - Websites or pages used to test performance of axe-core under various conditions.
- `report.js` - Generates a performance report by running axe-core on each of the sites in the `./sites` directory. It will run each site a dynamic number of times (based on how long the first run of axe-core takes) and then computes a distribution summary for each axe-core performance metric.
- `compare.js` - Compares two performance reports and outputs a markdown table of the difference between their metrics for each site in the report. Can return just a summary for the `axe` metric (total axe run time) or all metrics by passing `--axe-only` or `--all` respectively.

## `perf-compare` workflow behavior

The `.github/workflows/perf-compare.yml` workflow is advisory — it never blocks merging. `continue-on-error` keeps the **workflow's overall status** green even when individual jobs fail, but note that **failed jobs still appear as red on the PR's checks list** — that's a GHA UI limitation, not an indication that something is broken.

A few situations produce no PR comment (or a different one):

- **Either perf job fails** (build error, runner flake, artifact upload failure): the compare job is skipped because its `needs:` are unsatisfied. Individual perf job shows red on the checks list; no comment is posted.
- **Base branch predates the perf comparison**: the workflow detects the missing `perf/report.js` on base and posts a "rebase to get it" comment instead of the diff. The base job shows red on the checks list.
- **Fork PRs**: `GITHUB_TOKEN` is read-only for fork-authored PRs, so the comment step is skipped. The step summary still shows the diff.

If a comment doesn't appear on a `lib/**` PR, check the workflow's run log for the reason before assuming it's broken.
