import cleanupPlugins from './cleanup-plugins';
import configureChecksRulesAndBranding from './configure';
import getRules from './get-rules';
import load from './load';
import { getReporter, registerReporter } from './reporter';
import resetConfiguration from './reset';
import runRules from './run-rules';
import runVirtualRule from './run-virtual-rule';
import run from './run';
import registerPlugin from './plugins';

axe.cleanup = cleanupPlugins;
axe.configure = configureChecksRulesAndBranding;
axe.getRules = getRules;
axe._load = load;
axe.getReporter = getReporter;
axe.addReporter = registerReporter;
axe.reset = resetConfiguration;
axe._runRules = runRules;
axe.runVirtualRule = runVirtualRule;
axe.run = run;

axe.plugins = {};
axe.registerPlugin = registerPlugin;
