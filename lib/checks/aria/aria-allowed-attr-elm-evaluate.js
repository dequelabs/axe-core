import { getExplicitRole } from '../../commons/aria';
import { getElementSpec, getGlobalAriaAttrs } from '../../commons/standards';

export default function ariaAllowedAttrElmEvaluate(node, options, virtualNode) {
  const elmSpec = getElementSpec(virtualNode);

  // If no allowedAriaAttrs restriction, this check doesn't apply
  if (!elmSpec.allowedAriaAttrs) {
    return true;
  }

  // If element has an explicit role, defer to the role-based check
  const explicitRole = getExplicitRole(virtualNode);
  if (explicitRole) {
    return true;
  }

  const { allowedAriaAttrs } = elmSpec;
  const globalAriaAttrs = getGlobalAriaAttrs();
  const invalid = [];

  for (const attrName of virtualNode.attrNames) {
    if (
      globalAriaAttrs.includes(attrName) &&
      !allowedAriaAttrs.includes(attrName)
    ) {
      invalid.push(attrName);
    }
  }

  if (!invalid.length) {
    return true;
  }

  const messageKey = invalid.length > 1 ? 'plural' : 'singular';
  this.data({
    messageKey,
    nodeName: virtualNode.props.nodeName,
    values: invalid
      .map(attrName => attrName + '="' + virtualNode.attr(attrName) + '"')
      .join(', ')
  });

  return false;
}
