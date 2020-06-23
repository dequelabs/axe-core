function bypassMatches(node) {
	return !!node.querySelector('a[href]');
}

export default bypassMatches;
