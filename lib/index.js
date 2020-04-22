import * as utils from './core/utils';
import constants from './core/constants';
import AbstractVirtualNode from './core/base/virtual-node/abstract-virtual-node';
import SerialVirtualNode from './core/base/virtual-node/serial-virtual-node';
import VirtualNode from './core/base/virtual-node/virtual-node';
import log from './core/log';
import cache from './core/base/cache';
import cleanup from './core/public/cleanup';
import configure from './core/public/configure';
import getRules from './core/public/get-rules';
import load from './core/public/load';
import registerPlugin, { plugins } from './core/public/plugins';
import { getReporter, addReporter } from './core/public/reporter';
import reset from './core/public/reset';
import runRules from './core/public/run-rules';
import runVirtualRule from './core/public/run-virtual-rule';
import run from './core/public/run';
import * as commons from './commons';
import { getAudit } from './core/globals';

import naReporter from './core/reporters/na';
import noPassesReporter from './core/reporters/no-passes';
import rawEnvReporter from './core/reporters/raw-env';
import rawReporter from './core/reporters/raw';
import v1Reporter from './core/reporters/v1';
import v2Reporter from './core/reporters/v2';

// import for tests
// TODO: remove when tests can import
import Audit from './core/base/audit';
import CheckResult from './core/base/check-result';
import Check from './core/base/check';
import Context from './core/base/context';
import RuleResult from './core/base/rule-result';
import Rule from './core/base/rule';
import {
	failureSummary,
	getEnvironmentData,
	incompleteFallbackMessage,
	processAggregate
} from './core/reporters/helpers';

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
	commons,
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

load();

export default axe;
