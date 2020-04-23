import AbstractVirtualNode, {
	isAbstractNode
} from './virtual-node/abstract-virtual-node';
import SerialVirtualNode from './virtual-node/serial-virtual-node';
import VirtualNode from './virtual-node/virtual-node';
import cache from './cache';

import Audit from './audit';
import CheckResult from './check-result';
import Check from './check';
import Context from './context';
import RuleResult from './rule-result';
import Rule from './rule';

axe.AbstractVirtualNode = AbstractVirtualNode;
axe.SerialVirtualNode = SerialVirtualNode;
axe.VirtualNode = VirtualNode;
axe._cache = cache;

// TODO: remove
axe._isAbstractNode = isAbstractNode;

// Setting up this private/temp namespace for the tests (which cannot yet `import/export` things).
// TODO: remove `_thisWillBeDeletedDoNotUse`
axe._thisWillBeDeletedDoNotUse = axe._thisWillBeDeletedDoNotUse || {};
axe._thisWillBeDeletedDoNotUse.base = {
	Audit,
	CheckResult,
	Check,
	Context,
	RuleResult,
	Rule
};
