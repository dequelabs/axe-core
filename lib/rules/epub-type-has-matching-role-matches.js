function epubTypeHasMatchingRoleMatches(node) {
	// selector: '[*|type]',
	return (
		node.hasAttributeNS('http://www.idpf.org/2007/ops', 'type') ||
		node.hasAttribute('epub:type') // for unit tests that are not XML-aware due to fixture.innerHTML
	);

	// console.log('node.nodeName: ', node.nodeName);
	// const attrs = Array.from(getNodeAttributes(node));
	// console.log(attrs.length);
	// attrs.forEach((attr) => {
	// 	console.log('\n=====');
	// 	console.log(JSON.stringify(attr));
	// 	console.log('attr.nodeName: ', attr.nodeName);
	// 	console.log('attr.namespaceURI: ', attr.namespaceURI);
	// });
}

export default epubTypeHasMatchingRoleMatches;
