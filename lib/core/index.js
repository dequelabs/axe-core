/*global axeFunction, module, define */
// exported namespace for axe
/*eslint no-use-before-define: 0, no-unused-vars: 0*/
import * as utils from './utils';
import constants from './constants';
import AbstractVirtualNode from './base/virtual-node/abstract-virtual-node';
import SerialVirtualNode from './base/virtual-node/serial-virtual-node';
import VirtualNode from './base/virtual-node/virtual-node';
import log from './log';
import cache from './base/cache';
import cleanup from './public/cleanup';
import configure from './public/configure';
import getRules from './public/get-rules';
import load from './public/load';
import registerPlugin, { plugins } from './public/plugins';
import { getReporter, addReporter } from './public/reporter';
import reset from './public/reset';
import runRules from './public/run-rules';
import runVirtualRule from './public/run-virtual-rule';
import run from './public/run';
import { getAudit } from './globals';

import naReporter from './reporters/na';
import noPassesReporter from './reporters/no-passes';
import rawEnvReporter from './reporters/raw-env';
import rawReporter from './reporters/raw';
import v1Reporter from './reporters/v1';
import v2Reporter from './reporters/v2';

// import for tests
// TODO: remove when tests can import
import Audit from './base/audit';
import CheckResult from './base/check-result';
import Check from './base/check';
import Context from './base/context';
import RuleResult from './base/rule-result';
import Rule from './base/rule';
import {
	failureSummary,
	getEnvironmentData,
	incompleteFallbackMessage,
	processAggregate
} from './reporters/helpers';

const axe = {
	version: constants.version,
	utils,
	_cache: cache,
	AbstractVirtualNode,
	SerialVirtualNode,
	VirtualNode,
	constants,
	log,
	cleanup,
	configure,
	getRules,
	_load: load,
	plugins,
	registerPlugin,
	getReporter,
	addReporter,
	reset,
	_runRules: runRules,
	runVirtualRule,
	run,
	get _audit() {
		return getAudit();
	},

	// Setting up this private/temp namespace for the tests (which cannot yet `import/export` things).
	// TODO: remove `_thisWillBeDeletedDoNotUse`
	_thisWillBeDeletedDoNotUse: {
		base: {
			Audit,
			CheckResult,
			Check,
			Context,
			RuleResult,
			Rule
		},
		helpers: {
			failureSummary,
			getEnvironmentData,
			incompleteFallbackMessage,
			processAggregate
		}
	}
};

addReporter('na', naReporter);
addReporter('no-passes', noPassesReporter);
addReporter('rawEnv', rawEnvReporter);
addReporter('raw', rawReporter);
addReporter('v1', v1Reporter);
addReporter('v2', v2Reporter, true);

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
