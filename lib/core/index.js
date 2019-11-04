import constants from './constants.js';
import log from './log.js';
import * as utils from './utils/index.js';
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
} from './base/index.js';
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
} from './public/index.js';

/*exported axe, commons */
/*global axeFunction, module, define */
// exported namespace for axe
/*eslint no-use-before-define: 0, no-unused-vars: 0*/
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
	run
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
// local namespace for common functions
var commons;

function SupportError(error) {
	this.name = 'SupportError';
	this.cause = error.cause;
	this.message = `\`${error.cause}\` - feature unsupported in your environment.`;
	if (error.ruleId) {
		this.ruleId = error.ruleId;
		this.message += ` Skipping ${this.ruleId} rule.`;
	}
	this.stack = new Error().stack;
}
SupportError.prototype = Object.create(Error.prototype);
SupportError.prototype.constructor = SupportError;
