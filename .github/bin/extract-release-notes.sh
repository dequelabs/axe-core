#!/usr/bin/env bash

set -eu -o pipefail

# Extracts the body of the most recent release section from CHANGELOG.md —
# everything between the latest version header and the previous one. The
# version header itself is not included. The result is written as a
# multiline `notes` step output to $GITHUB_OUTPUT when set (GitHub
# Actions), otherwise to stdout.
#
# The awk pattern /# \[?[0-9]/ matches version-header lines (`#`, space,
# optional `[`, digit), e.g. `### [4.11.4](...) (2026-04-23)`. The pattern
# is not anchored, so it matches the `# [4` substring inside `###`. On the
# first match it sets `found=1` and skips the line (so the header itself
# is not printed); on the next match (the previous release's header) it
# exits. `found{print}` prints every line in between.
#
# Walking through a typical CHANGELOG.md:
#
#   Line                              v-header?  found    Action
#   --------------------------------  ---------  ------   -------
#   # Changelog                       no         0        nothing
#   All notable changes...            no         0        nothing
#   ### [4.11.4](...) (2026-04-23)    yes        0 -> 1   skip
#   (blank)                           no         1        print
#   ### Bug Fixes                     no         1        print
#   - **commons/text:** ...           no         1        print
#   - **utils/getAncestry:** ...      no         1        print
#   ### [4.11.3](...) (2026-04-13)    yes        1        exit

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

{
  echo 'notes<<EOF'
  awk '/# \[?[0-9]/{if(found) exit; found=1; next} found{print}' "$repo_root/CHANGELOG.md"
  echo 'EOF'
} >> "${GITHUB_OUTPUT:-/dev/stdout}"
