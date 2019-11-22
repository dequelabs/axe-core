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
import commons from './commons';
import * as checks from './checks';

window.axe = {
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
axe.version = packageJson.version;

const checkEvaluates = Object.keys(checks).map(checkId => {
	const { id, evaluate } = checks[checkId];
	return { id, evaluate };
});

axe._load({
	checks: checkEvaluates,
	commons: []
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
