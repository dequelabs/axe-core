import getRole from '../../commons/aria/get-role';
import ariaConditionalCheckboxAttr from './aria-conditional-checkbox-attr-evaluate';
import ariaConditionalRowAttr from './aria-conditional-row-attr-evaluate';

const conditionalRoleMap = {
  row: ariaConditionalRowAttr,
  checkbox: ariaConditionalCheckboxAttr
};

export default function ariaConditionalAttrEvaluate(
  node,
  options,
  virtualNode
) {
  const role = getRole(virtualNode);
  if (!conditionalRoleMap[role]) {
    return true;
  }
  return conditionalRoleMap[role].call(this, node, options, virtualNode);
}
