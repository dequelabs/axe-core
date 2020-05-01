import { sanitize } from '../commons/text';

function frameTitleHasTextMatches(node) {
	var title = node.getAttribute('title');
	return !!(title ? sanitize(title).trim() : '');
}

export default frameTitleHasTextMatches;
