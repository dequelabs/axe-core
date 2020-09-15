import cache from '../core/base/cache';

function windowIsTopMatches(node) {
	return (
		cache.get('isTopWindow') ||
		node.ownerDocument.defaultView.self === node.ownerDocument.defaultView.top
	);
}

export default windowIsTopMatches;
