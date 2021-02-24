import { getRole } from '../../commons/aria';
import standards from '../../standards';
import { querySelectorAllFilter } from '../../core/utils';

/**
 * Check that an element does not use any unsupported ARIA attributes for it's particular role.
 * @param {VirtualNode} vNode
 * @return {String[]}
 */
function getUnsupportedRoleAttrs(vNode) {
  const unsupported = [];
  const role = getRole(vNode);

  if (!role) {
    return unsupported;
  }
  const attrs = vNode.attrNames;
  const unsupportedAttrs = standards.ariaRoles[role].unsupportedAttrs;

  if (!unsupportedAttrs) {
    return unsupported;
  }

  const preChecks = {
    // aria-required is not supported on fieldset elements but only
    // if set to true and no other descendant form element is
    // required
    // @see https://github.com/dequelabs/axe-core/pull/2767#discussion_r561272090
    'aria-required': () => {
      const requiredInputSelector =
        ':is(input, textarea):is([aria-required="true"],[required])';
      const requiredDescendants = querySelectorAllFilter(
        vNode,
        requiredInputSelector
      ).length;

      if (
        vNode.props.nodeName === 'fieldset' &&
        vNode.attr('aria-required') === 'true' &&
        !requiredDescendants
      ) {
        return true;
      }
    }
  };

  for (let i = 0; i < attrs.length; i++) {
    const attrName = attrs[i];
    if (
      unsupportedAttrs.includes(attrName) &&
      (preChecks[attrName] ? preChecks[attrName]() : true)
    ) {
      unsupported.push(attrName);
    }
  }

  return unsupported;
}

export default getUnsupportedRoleAttrs;
