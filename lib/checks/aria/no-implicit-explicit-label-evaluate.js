import { getRole } from '../../commons/aria';
import {
  sanitize,
  labelText,
  accessibleText
} from '../../commons/text';

function noImplicitExplicitLabelEvaluate(node, options, virtualNode, context) {
  const role = getRole(node, { noImplicit: true });
  this.data(role);

  const labelText = sanitize(labelText(virtualNode)).toLowerCase();
  const accText = sanitize(accessibleText(node)).toLowerCase();

  if (!accText && !labelText) {
  	return false;
  }

  if (!accText && labelText) {
  	return undefined;
  }

  if (!accText.includes(labelText)) {
  	return undefined;
  }

  return false;
}

export default noImplicitExplicitLabelEvaluate;