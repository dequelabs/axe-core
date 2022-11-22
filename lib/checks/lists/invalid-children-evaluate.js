import { isVisibleToScreenReaders } from '../../commons/dom';
import { getExplicitRole } from '../../commons/aria';

export default function invalidChildrenEvaluate(
  node,
  options = {},
  virtualNode
) {
  const relatedNodes = [];
  const issues = [];
  if (!virtualNode.children) {
    return undefined;
  }

  const vChildren = mapWithNested(virtualNode.children);
  while (vChildren.length) {
    const { vChild, nested } = vChildren.shift();
    if (options.divGroups && !nested && isDivGroup(vChild)) {
      if (!vChild.children) {
        return undefined;
      }
      const vGrandChildren = mapWithNested(vChild.children, true);
      vChildren.push(...vGrandChildren);
      continue;
    }

    const issue = getInvalidSelector(vChild, nested, options);
    if (!issue) {
      continue;
    }
    if (!issues.includes(issue)) {
      issues.push(issue);
    }
    if (vChild?.actualNode?.nodeType === 1) {
      relatedNodes.push(vChild.actualNode);
    }
  }
  if (issues.length === 0) {
    return false;
  }

  this.data({ values: issues.join(', ') });
  this.relatedNodes(relatedNodes);
  return true;
}

function getInvalidSelector(
  vChild,
  nested,
  { validRoles = [], validNodeNames = [] }
) {
  const { nodeName, nodeType, nodeValue } = vChild.props;
  const selector = nested ? 'div > ' : '';
  if (nodeType === 3 && nodeValue.trim() !== '') {
    return selector + `#text`;
  }
  if (nodeType !== 1 || !isVisibleToScreenReaders(vChild)) {
    return false;
  }

  const role = getExplicitRole(vChild);
  if (role) {
    return validRoles.includes(role) ? false : selector + `[role=${role}]`;
  } else {
    return validNodeNames.includes(nodeName) ? false : selector + nodeName;
  }
}

function isDivGroup(vNode) {
  return vNode.props.nodeName === 'div' && getExplicitRole(vNode) === null;
}

function mapWithNested(vNodes, nested = false) {
  return vNodes.map(vChild => ({ vChild, nested }));
}
