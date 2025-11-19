#!/usr/bin/env bash

if [ -z "$REPOSITORY" ] || [ -z "$SHA" ] || [ -z "$WORKFLOW_NAME" ]; then
  echo "Error: REPOSITORY, SHA, or WORKFLOW_NAME is not set."
  exit 1
fi

if ! command -v jq &> /dev/null; then
  echo "::error::jq is not installed. Please install jq to use this script."
  exit 1
fi

if ! command -v gh &> /dev/null; then
  echo "::error::GitHub CLI (gh) is not installed. Please install gh to use this script."
  exit 1
fi

echo "Waiting for '$WORKFLOW_NAME' workflow to complete for commit $SHA"

# 30 seconds in between lookups. 24 attempts by default.
# This gives up to 12 minutes for the workflow to complete.

SLEEP_SECONDS=${SLEEP_SECONDS:-30}
MAX_ATTEMPTS=${MAX_ATTEMPTS:-24}

attempt=0

while [ $attempt -lt $MAX_ATTEMPTS ]; do
  # Get the most recent workflow run for this SHA and workflow name
  # Workflow runs are returned in descending order by created_at (most recent first)
  workflow_data=$(gh api "repos/$REPOSITORY/actions/runs?head_sha=$SHA" \
    --jq ".workflow_runs[] | select(.name == \"$WORKFLOW_NAME\") | {status: .status, conclusion: .conclusion} | select(. != null)" 2>/dev/null | head -n 1 || echo "")

  if [ -z "$workflow_data" ]; then
    echo "Attempt $((attempt + 1))/$MAX_ATTEMPTS - Workflow run not found yet"
  else
    status=$(echo "$workflow_data" | jq -r '.status')
    conclusion=$(echo "$workflow_data" | jq -r '.conclusion')

    echo "Attempt $((attempt + 1))/$MAX_ATTEMPTS - Status: $status, Conclusion: $conclusion"

    if [ "$status" = "completed" ]; then
      if [ "$conclusion" = "success" ]; then
        echo "'$WORKFLOW_NAME' workflow completed successfully!"
        exit 0
      else
        echo "::error::'$WORKFLOW_NAME' workflow completed with status: $conclusion"
        exit 1
      fi
    fi
  fi

  attempt=$((attempt + 1))
  sleep $SLEEP_SECONDS
done

echo "::error::Timeout waiting for '$WORKFLOW_NAME' workflow to complete"
exit 1
