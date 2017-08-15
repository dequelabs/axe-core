#!/bin/sh

if [ -d ".git" ]; then
	if [ ! -f ".git/hooks/commit-msg" ]; then
		echo "Installing pre-commit hook"
		cd .git/hooks/ && cp ../../node_modules/angular-precommit/index.js commit-msg && cd ../../
	fi
fi