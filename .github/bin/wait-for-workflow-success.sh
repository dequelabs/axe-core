#!/usr/bin/env bash

# This script waits for a specified GitHub Actions workflow to complete successfully.
# Debug mode can be enabled by setting the DEBUG environment variable to "true".
# Exit codes are as follows:
# 0 - Workflow completed successfully
# 1 - Workflow completed with failure
# 2 - Missing required tools on the host system
# 3 - Missing required environment variables for configuration
# 20 - Timeout waiting for workflow to complete

set -eo pipefail

if ! command -v jq &> /dev/null; then
  echo "::error::jq is not installed. Please install jq to use this script."
  exit 2
fi

if ! command -v gh &> /dev/null; then
  echo "::error::GitHub CLI (gh) is not installed. Please install gh to use this script."
  exit 2
fi

if [ -z "$REPOSITORY" ]; then
  echo "::error::REPOSITORY environment variable must be set."
  exit 3
fi

if [ -z "$SHA" ]; then
  echo "::error::SHA environment variable must be set."
  exit 3
fi

if [ -z "$WORKFLOW_NAME" ]; then
  echo "::error::WORKFLOW_NAME environment variable must be set."
  exit 3
fi

if [ -z "$BRANCH" ]; then
  echo "::error::BRANCH environment variable must be set."
  exit 3
fi

# When running locally for testing, this might be forgotten to get set.
# Create a temp file just so there is something to write to that will get thrown away.
if [ -z "$GITHUB_STEP_SUMMARY" ]; then
  GITHUB_STEP_SUMMARY=$(mktemp)
fi

echo "Waiting for '$WORKFLOW_NAME' workflow to complete for commit $SHA"

# If not provided, default to 5 minutes for the job runner to time out.
TIMEOUT_MINUTES=${TIMEOUT_MINUTES:-5}
# Round down if given a fractional number by just removing the decimal portion.
TIMEOUT_MINUTES=${TIMEOUT_MINUTES%.*}
sleep_seconds=30
max_attempts=$(( (TIMEOUT_MINUTES * 60) / sleep_seconds ))
attempt=0

# We *could* do `status=success` as a query parameter. But then we lose visibility
# into "in-progress" for debugging purposes to at least know if it found a run
# while waiting.
# Ref: https://docs.github.com/en/rest/actions/workflow-runs?apiVersion=2022-11-28#list-workflow-runs-for-a-repository
api_url="repos/$REPOSITORY/actions/runs?head_sha=$SHA&branch=$BRANCH&exclude_pull_requests=true&event=push"

# This jq filter can seem complicated. So here is the breakdown:
# 1. `.workflow_runs` - Get the array of workflow runs from the API response
# 2. `sort_by(.created_at) | reverse` - Sort the runs by creation date in descending order. Since the API has no guaranteed order.
# 3. `[.[] | select(.name == "'"$WORKFLOW_NAME"'")][0]` - Filter the runs to only include those with the specified workflow name. Then take the first one (most recent)
# 4. `{status: .status, conclusion: .conclusion}` - Extract only the status and conclusion fields. Since we know this is the most recent run, we only care about these fields later.
# 5. `select(. != null)` - Ensure that we only get a result if there is a matching workflow run
jq_filter='.workflow_runs | sort_by(.created_at) | reverse | [.[] | select(.name == "'"$WORKFLOW_NAME"'")][0] | {status: .status, conclusion: .conclusion} | select(. != null)'

cat >> "$GITHUB_STEP_SUMMARY" <<EOF
# Wait for Workflow Success

## Config Data

### Environment Inputs

* Repository: \`$REPOSITORY\`
* Commit SHA: \`$SHA\`
* Branch: \`$BRANCH\`
* Workflow Name: \`$WORKFLOW_NAME\`
* Debug Mode: \`${DEBUG:-false}\`
* Timeout Minutes: \`$TIMEOUT_MINUTES\`

### Internal Configuration

* Sleep Seconds: \`$sleep_seconds\`
* Max Attempts: \`$max_attempts\`

### API Input

* API URL: \`$api_url\`
* JQ Filter: \`$jq_filter\`

EOF

if [ "$DEBUG" = "true" ]; then
  log_output=$(mktemp)
else
  log_output="/dev/null"
fi

# Logs API errors to the summary if debug is enabled.
function writeLogToSummary() {
  if [ "$DEBUG" != "true" ]; then
    return
  fi

  {
    echo ""
    echo "## GH API Error Log"
    echo ""
    if [ ! -s "$log_output" ]; then
      echo "No errors captured."
    else
      echo '```'
      cat "$log_output"
      echo '```'
    fi
    echo ""
  } >> "$GITHUB_STEP_SUMMARY"
}

while [ "$attempt" -lt "$max_attempts" ]; do
  # Redirect errors to /dev/null to avoid unusable data in the variable in case of failure.
  # If we seem to be having issues in CI later, it would be valuable to setup debugging to log to $GITHUB_STEP_SUMMARY.
  workflow_data=$(gh api "$api_url" --jq "$jq_filter" 2>"$log_output" || echo "")

  if [ -z "$workflow_data" ]; then
    echo "Attempt $((attempt + 1))/$max_attempts - Workflow run not found yet"
  else
    status=$(echo "$workflow_data" | jq -r '.status')
    conclusion=$(echo "$workflow_data" | jq -r '.conclusion')

    echo "Attempt $((attempt + 1))/$max_attempts - Status: $status, Conclusion: $conclusion"

    if [ "$status" = "completed" ]; then
      # Write the result to the summary file
      function writeResultToSummary() {
        cat >> "$GITHUB_STEP_SUMMARY" <<EOF
## Result of workflow - $WORKFLOW_NAME

* Status: \`$status\`
* Conclusion: \`$conclusion\`

### API Details

* Total Attempts: \`$((attempt + 1))\`
* Time Elapsed: \`$(((attempt + 1) * sleep_seconds)) seconds\`
* Remaining allocated time: \`$(((max_attempts - attempt - 1) * sleep_seconds)) seconds\`

EOF
      }

      if [ "$conclusion" = "success" ]; then
        echo "'$WORKFLOW_NAME' workflow completed successfully!"
        writeResultToSummary
        writeLogToSummary
        exit 0
      else
        echo "::error::'$WORKFLOW_NAME' workflow completed with status: $conclusion"
        writeResultToSummary
        writeLogToSummary
        exit 1
      fi
    fi
  fi

  attempt=$((attempt + 1))
  sleep "$sleep_seconds"
done

cat >> "$GITHUB_STEP_SUMMARY" <<EOF
## Result of workflow - $WORKFLOW_NAME

The maximum number of attempts was reached without the workflow completing.
Therefore, the resolution could not be determined to proceed with deployment.

> [!TIP]
> Re-running this workflow with debug mode enabled will capture API error logs to help diagnose issues.

> [!WARNING]
> This can typically indicate that GitHub Action runners are experiencing delays.
> Please check the [GitHub Status Page](https://www.githubstatus.com/) for any ongoing incidents.
> If the status is normal, or if it already is, wait a little bit before re-running the workflow.

> [!CAUTION]
> If another commit is already deployed, then do *not* re-run this deployment workflow.
> Re-running this would cause an older commit to be the next tag.
> If multiple deployments are failed in a row, then re-run them sequentially as the incident is resolved.

EOF
writeLogToSummary

echo "::error::Timeout waiting for '$WORKFLOW_NAME' workflow to complete"
exit 20
