import packageJson from '../package.json';
import constants from './core/constants';
import log from './core/log';
import * as utils from './core/utils';
import {
	AbstractVirtualNode,
	SerialVirtualNode,
	VirtualNode,
	Audit,
	cache,
	CheckResult,
	Check,
	createExecutionContext,
	Context,
	RuleResult,
	Rule
} from './core/base';
import * as imports from './core/imports';
import {
	cleanup,
	configure,
	getRules,
	load,
	registerPlugin,
	plugins,
	getReporter,
	addReporter,
	reset,
	runRules,
	runVirtualRule,
	run
} from './core/public';
import {
	naReporter,
	noPassesReporter,
	rawEnvReporter,
	rawReporter,
	v1Reporter,
	v2Reporter
} from './core/reporters';
import commons from './commons';
import * as checkMetadata from './checks';
import * as ruleMetadata from './rules';
import anyFailureSummary from './misc/any-failure-summary';
import incompleteFallback from './misc/incomplete-fallback';
import noneFailureSummary from './misc/none-failure-summary';

// TODO: fix this when axe._audit, axe._selectorData, etc. have been resolved
window.axe = {
	version: packageJson.version,
	constants,
	log,
	utils,
	AbstractVirtualNode,
	SerialVirtualNode,
	VirtualNode,
	_cache: cache,
	imports,
	cleanup,
	configure,
	getRules,
	_load: load,
	registerPlugin,
	plugins,
	getReporter,
	addReporter,
	reset,
	_runRules: runRules,
	runVirtualRule,
	run,
	commons
};

addReporter('na', naReporter);
addReporter('no-passes', noPassesReporter);
addReporter('rawEnv', rawEnvReporter);
addReporter('raw', rawReporter);
addReporter('v1', v1Reporter);
addReporter('v2', v2Reporter, true);

let ruleData = {};
let rules = [];
Object.keys(ruleMetadata).forEach(ruleId => {
	const { metadata, ...rule } = ruleMetadata[ruleId];
	ruleData[rule.id] = metadata;
	rules.push(rule);
});

let checks = [];
let checkData = {};
Object.keys(checkMetadata).forEach(checkId => {
	const { metadata, ...check } = checkMetadata[checkId];
	checkData[check.id] = metadata;
	checks.push(check);
});

axe._load({
	data: {
		rules: ruleData,
		checks: checkData,
		failureSummaries: {
			any: anyFailureSummary.metadata,
			none: noneFailureSummary.metadata
		},
		incompleteFallbackMessage: incompleteFallback.incompleteFallbackMessage
	},
	rules,
	checks,
	commons
});

if (typeof define === 'function' && define.amd) {
	// Explicitly naming the module to avoid mismatched anonymous define() modules when injected in a page
	define('axe-core', [], function() {
		'use strict';
		return axe;
	});
}
if (
	typeof module === 'object' &&
	module.exports &&
	typeof axeFunction.toString === 'function'
) {
	axe.source =
		'(' +
		axeFunction.toString() +
		')(typeof window === "object" ? window : this);';
	module.exports = axe;
}
if (typeof window.getComputedStyle === 'function') {
	window.axe = axe;
}
