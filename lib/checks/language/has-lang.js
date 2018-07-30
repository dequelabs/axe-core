return !!(
	node.getAttribute('lang') ||
	node.getAttribute('xml:lang') ||
	''
).trim();
