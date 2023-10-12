import axe from '../../axe';

const frameContexts = axe.utils.getFrameContexts('body');
const dqElement = new axe.utils.DqElement(document.body);
const element = axe.utils.shadowSelect(dqElement.selector[0]);
const elements = axe.utils.shadowSelectAll(dqElement.selector[0]).splice(0);
const standards = axe.utils.getStandards();
const uuid = axe.utils.uuid() as string;

const { runChecksSync, after } = axe.utils.getRule('color-contrast');
runChecksSync(
  'any',
  new axe.VirtualNode(document.body),
  {},
  { include: 'foo' }
);
after({} as axe.RawResult, {});

axe.utils.publishMetaData({} as axe.RawResult);
axe.utils.finalizeRuleResult({} as axe.RawResult);
axe.utils.aggregateResult([]);
