# Axe-core Performance

Scripts and tools for reporting and tracking axe-core performance.

- `./reports` - Generated performance reports of axe-core.
- `./sites` - Websites or pages used to test performance of axe-core under various conditions.
- `report.js` - Generates a performance report by running axe-core on each of the sites in the `./sites` directory. It will run each site a dynamic number of times (based on how long the first run of axe-core takes) and then computes a distribution summary for each axe-core performance metric.
- `compare.js` - Compares two performance reports and outputs a markdown table of the difference between their metrics for each site in the report. Can return just a summary for the `axe` metric (total axe run time) or all metrics by passing `--axe-only` or `--all` respectively.

## `perf-compare` workflow behavior

The `.github/workflows/perf-compare.yml` workflow is advisory — it never blocks merging. `continue-on-error` keeps the **workflow's overall status** green even when the job fails, but note that **a failed job still appears as red on the PR's checks list** — that's a GHA UI limitation, not an indication that something is broken.

The workflow runs base and head **sequentially on one runner** so both measurements come from the same physical CPU. GitHub Actions uses a heterogeneous runner fleet (EPYC 7763, EPYC 9V74, Xeon 8573C are all in play) and a single measurement can vary by 30%+ between CPU generations, so running each side on a separate runner produces nonsense comparisons. The trade-off is ~2× wall clock per PR.

A few situations produce no PR comment:

- **Head does not contain the perf infrastructure** (a PR that removes `perf/report.js`): the workflow exits early with a `::warning::`. No comment is posted.
- **Base ref is unreachable or its `lib/` can't be built**: the `Swap to base lib` or `Build axe.js (base)` step fails and comparison can't happen. Job shows red; no comment is posted.
- **Fork PRs**: `GITHUB_TOKEN` is read-only for fork-authored PRs, so the comment step is skipped. The step summary still shows the diff, and both `base.json` / `head.json` are uploaded as an artifact.

If a comment doesn't appear on a `lib/**` PR, check the workflow's run log for the reason before assuming it's broken.
