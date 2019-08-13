const { aria, text } = axe.commons;

const role = aria.getRole(node);
const hasAccName = !!text.accessibleTextVirtual(virtualNode, {
	includeHidden: true
});

if (!hasAccName) {
	return false;
}

if (role && role !== 'link') {
	return false;
}

return true;
