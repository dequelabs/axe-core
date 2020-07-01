import windowIsTopMatches from './window-is-top-matches';

function bypassMatches(node) {
	// the top level window should have an anchor
	if (windowIsTopMatches(node)) {
		return !!node.querySelector('a[href]');
	}

	// all iframes do not need an anchor but should be checked for bypass
	// elements (headings, landmarks, etc.)
	return true;
}

export default bypassMatches;
