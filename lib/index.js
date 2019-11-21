import constants from './core/constants.js';
import log from './core/log.js';
import * as utils from './core/utils/index.js';
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
} from './core/base/index.js';
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
} from './core/public/index.js';
import commons from './commons/index.js';

var axe = axe || {
	constants,
	log,
	utils,
	AbstractVirtualNode,
	SerialVirtualNode,
	VirtualNode,
	_cache: cache,
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
axe.version = '<%= pkg.version %>';

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
