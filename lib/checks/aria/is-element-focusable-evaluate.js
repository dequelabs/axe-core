import { isFocusable } from '../../commons/dom';

function isElementFocusableEvaluate(node) {
	return isFocusable(node);
}

export default isElementFocusableEvaluate;
